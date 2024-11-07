/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'https://bamboo-skj.vercel.app/api/:path*',
    },
  ],
};

export default nextConfig;
