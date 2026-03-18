/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/free-courses',
        destination: '/study/courses',
        permanent: true,
      },
      {
        source: '/free-courses/:path*',
        destination: '/study/courses/:path*',
        permanent: true,
      },
    ]
  },
}
export default nextConfig
