const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: true
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  images: {
    remotePatterns: [{
      hostname: 'lh3.googleusercontent.com'
    },
    {
      hostname: 'gtsjuxikwdifunrkhpyp.supabase.co'
    }]
  }
})
