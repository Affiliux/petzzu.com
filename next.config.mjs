import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 30, // Set stale time for dynamic content
    },
  },
  env: {
    NEXT_PUBLIC_ENV: process.env.ENV,
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_TAG_MANAGER_ID: process.env.TAG_MANAGER_ID,
    NEXT_PUBLIC_AI_API_KEY: process.env.AI_API_KEY,
    NEXT_PUBLIC_STONE_APP_ID: process.env.STONE_APP_ID,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: /node_modules/,
      }
    }
    return config
  },
}

export default withNextIntl(nextConfig)
