/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // basePath: "/senai-prod",
  // assetPrefix: "/senai-prod/",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
