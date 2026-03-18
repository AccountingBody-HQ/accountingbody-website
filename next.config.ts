import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
