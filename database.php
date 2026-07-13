<?php
/**
 * Database Connection Class
 * Handles all database operations
 */

class Database {
    private static $instance = null;
    private $connection;
    
    private function __construct() {
        try {
            $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            
            if ($this->connection->connect_error) {
                throw new Exception("Connection failed: " . $this->connection->connect_error);
            }
            
            $this->connection->set_charset("utf8mb4");
        } catch (Exception $e) {
            die("Database Error: " . $e->getMessage());
        }
    }
    
    /**
     * Get singleton instance
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Get database connection
     */
    public function getConnection() {
        return $this->connection;
    }
    
    /**
     * Execute prepared statement
     */
    public function execute($query, $params = [], $types = '') {
        $stmt = $this->connection->prepare($query);
        
        if ($params && $types) {
            $stmt->bind_param($types, ...$params);
        }
        
        if (!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }
        
        return $stmt;
    }
    
    /**
     * Fetch single row
     */
    public function fetchOne($query, $params = [], $types = '') {
        $stmt = $this->execute($query, $params, $types);
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    
    /**
     * Fetch all rows
     */
    public function fetchAll($query, $params = [], $types = '') {
        $stmt = $this->execute($query, $params, $types);
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    /**
     * Insert record
     */
    public function insert($table, $data) {
        $columns = array_keys($data);
        $values = array_values($data);
        $placeholders = array_fill(0, count($values), '?');
        
        $query = "INSERT INTO `$table` (" . implode(', ', $columns) . ") 
                  VALUES (" . implode(', ', $placeholders) . ")";
        
        $types = $this->getTypes($values);
        
        $stmt = $this->execute($query, $values, $types);
        return $this->connection->insert_id;
    }
    
    /**
     * Update record
     */
    public function update($table, $data, $where) {
        $set = [];
        $values = [];
        
        foreach ($data as $key => $value) {
            $set[] = "`$key` = ?";
            $values[] = $value;
        }
        
        $whereConditions = [];
        foreach ($where as $key => $value) {
            $whereConditions[] = "`$key` = ?";
            $values[] = $value;
        }
        
        $query = "UPDATE `$table` SET " . implode(', ', $set) . 
                 " WHERE " . implode(' AND ', $whereConditions);
        
        $types = $this->getTypes($values);
        
        $stmt = $this->execute($query, $values, $types);
        return $stmt->affected_rows;
    }
    
    /**
     * Delete record
     */
    public function delete($table, $where) {
        $values = [];
        $whereConditions = [];
        
        foreach ($where as $key => $value) {
            $whereConditions[] = "`$key` = ?";
            $values[] = $value;
        }
        
        $query = "DELETE FROM `$table` WHERE " . implode(' AND ', $whereConditions);
        $types = $this->getTypes($values);
        
        $stmt = $this->execute($query, $values, $types);
        return $stmt->affected_rows;
    }
    
    /**
     * Get row count
     */
    public function count($table, $where = []) {
        $query = "SELECT COUNT(*) as count FROM `$table`";
        
        if (!empty($where)) {
            $whereConditions = [];
            $values = [];
            
            foreach ($where as $key => $value) {
                $whereConditions[] = "`$key` = ?";
                $values[] = $value;
            }
            
            $query .= " WHERE " . implode(' AND ', $whereConditions);
            $result = $this->fetchOne($query, $values, $this->getTypes($values));
        } else {
            $result = $this->fetchOne($query);
        }
        
        return (int)$result['count'];
    }
    
    /**
     * Determine parameter types for binding
     */
    private function getTypes($values) {
        $types = '';
        foreach ($values as $value) {
            if (is_int($value)) {
                $types .= 'i';
            } elseif (is_float($value)) {
                $types .= 'd';
            } else {
                $types .= 's';
            }
        }
        return $types;
    }
    
    /**
     * Close connection
     */
    public function close() {
        if ($this->connection) {
            $this->connection->close();
        }
    }
}

// Create global database instance
$db = Database::getInstance();
