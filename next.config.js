const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  extendDefaultRuntimeCaching: []
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  images: {
    remotePatterns: [{
      hostname: 'lh3.googleusercontent.com'
    },
    {
      hostname: 'gtsjuxikwdifunrkhpyp.supabase.co'
    },
    {
      hostname: 'hfwnpordiopqstqizktp.supabase.co'
    }]
  }
})
