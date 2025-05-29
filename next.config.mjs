/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gateway.lighthouse.storage', 'emerald-big-beaver-890.mypinata.cloud', '/'],
  },
  generateBuildId: async () => {
    // This ensures a unique build ID on every deploy to prevent stale cache
    return Date.now().toString();
  },
};

export default nextConfig;
