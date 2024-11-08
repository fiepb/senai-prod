/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/senai-prod",
  assetPrefix: "/senai-prod/",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
