const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  images: {
    domains: ['lh3.googleusercontent.com', 'gtsjuxikwdifunrkhpyp.supabase.co']
  }
})
