import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `npm run build` emits plain HTML/CSS/JS into ./out
  output: "export",

  // Next's image optimizer needs a server, which a static export doesn't have.
  images: {
    unoptimized: true,
  },

  // Emit /about/index.html instead of /about.html so any static host serves it.
  trailingSlash: true,
};

export default nextConfig;
