import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "../lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-8xl font-extrabold text-gold">404</h1>
        <h2 className="mt-4 text-display text-2xl font-bold uppercase tracking-wider text-white">
          Page not found
        </h2>
        <p className="mt-3 text-sm text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-gold inline-flex rounded-md px-6 py-3 text-sm uppercase tracking-wider">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-2xl font-bold uppercase tracking-wider text-white">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-gold rounded-md px-6 py-3 text-sm uppercase tracking-wider"
          >
            Try again
          </button>
          <a href="/" className="btn-outline-gold rounded-md px-6 py-3 text-sm uppercase tracking-wider">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B0B0B" },
      { title: "Jawaclux Creations — Photography, Printing & Media, Ebonyi Nigeria" },
      { name: "description", content: "Premium photography, printing, branding and media services in Edda, Ebonyi State. Portraits, weddings, drone, banners, acrylic prints and more." },
      { name: "author", content: "Jawaclux Creations" },
      { property: "og:title", content: "Jawaclux Creations — Photography, Printing & Media, Ebonyi Nigeria" },
      { property: "og:description", content: "Premium photography, printing, branding and media services in Edda, Ebonyi State. Portraits, weddings, drone, banners, acrylic prints and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Jawaclux Creations — Photography, Printing & Media, Ebonyi Nigeria" },
      { name: "twitter:description", content: "Premium photography, printing, branding and media services in Edda, Ebonyi State. Portraits, weddings, drone, banners, acrylic prints and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7b0ed93f-0165-4442-b0a6-4a26f4ae62f4/id-preview-ba54b578--73e29949-3c25-4075-9ad9-4bebbe0e6692.lovable.app-1783836974333.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7b0ed93f-0165-4442-b0a6-4a26f4ae62f4/id-preview-ba54b578--73e29949-3c25-4075-9ad9-4bebbe0e6692.lovable.app-1783836974333.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}
