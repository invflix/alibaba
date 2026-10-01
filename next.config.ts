import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the existing WordPress URLs (/about-us/, /products/coupler/ ...) so rankings carry over.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
    // Tailwind output is small, so inlining removes the render-blocking stylesheet request for first-time visitors.
    inlineCss: true,
  },
  async redirects() {
    return [
      // Old service links pointed at pages that never existed on the WordPress site.
      { source: "/service/scaffolding-rentals/", destination: "/services/scaffolding-rentals/", permanent: true },
      { source: "/service/scaffolding-erection/", destination: "/services/scaffolding-erection/", permanent: true },
      { source: "/service/scaffolding-Sales/", destination: "/services/scaffolding-sales/", permanent: true },
      { source: "/service/scaffolding-sales/", destination: "/services/scaffolding-sales/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/wp-content/uploads/2022/04/Albatin2.pdf", destination: "/docs/al-batin-company-profile.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
