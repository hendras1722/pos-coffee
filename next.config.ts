import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/js-holder/:path*',
          destination: 'https://jsonplaceholder.typicode.com/:path*',
        },
        {
          source: '/supabase/:path*',
          destination:
            'https://tikuwnepqhtjbypmcsst.supabase.co/storage/v1/:path*',
        },
      ],
      beforeFiles: [
        {
          source: '/js-holder/:path*',
          destination: 'https://jsonplaceholder.typicode.com/:path*',
        },
        {
          source: '/supabase/:path*',
          destination:
            'https://tikuwnepqhtjbypmcsst.supabase.co/storage/v1/:path*',
        },
      ],
      fallback: [
        {
          source: '/js-holder/:path*',
          destination: 'https://jsonplaceholder.typicode.com/:path*',
        },
        {
          source: '/supabase/:path*',
          destination:
            'https://tikuwnepqhtjbypmcsst.supabase.co/storage/v1/:path*',
        },
      ],
    }
    // return [
    //   {

    //     basePath: false,
    //   },
    // ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tikuwnepqhtjbypmcsst.supabase.co',
        port: '',
        pathname: '/storage/v1/object/pos/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
      ],
    },
  ],
}

export default nextConfig
