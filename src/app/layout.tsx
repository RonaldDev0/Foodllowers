import { ReactNode } from 'react'
import { Providers } from './Providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from 'next'

// Components
import { SideBarr } from '@/components'

import 'tailwindcss/tailwind.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Foodllowers | 🍔 Food By Influencers',
  description: 'Foodllowers | 🍔 Food By Influencers',
  manifest: 'manifest.json'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <head>
        <meta name='theme-color' content='#1f1f1f' />
      </head>
      <body className='w-full min-h-screen flex flex-col top-12 items-center dark:bg-zinc-950'>
        <Providers>
          <SideBarr />
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
