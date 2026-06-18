

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Removed API proxy rewrites because we migrated to Next.js API Routes (Monolith)

};

export default nextConfig;
