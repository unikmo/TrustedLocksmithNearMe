import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/book", destination: "/business-enquiry", permanent: false },
      { source: "/book/:path*", destination: "/business-enquiry", permanent: false },
      { source: "/pricing", destination: "/services", permanent: false },
    ];
  },
  async headers() {
    return ["/login", "/signup", "/property-manager/:path*", "/admin/:path*", "/provider/:path*", "/providers/claim", "/providers/register", "/auth/:path*"].map(source => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }));
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "**.wikimedia.org" },
      { protocol: "https", hostname: "**.wikipedia.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
