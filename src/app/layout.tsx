import { ReactNode } from 'react'
import { Providers } from './Providers'
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
      <body className='w-full min-h-screen flex flex-col top-12 items-center dark:bg-gradient-to-r from-blue-950 dark:to-neutral-950'>
        <Providers>
          <SideBarr />
          {children}
        </Providers>
      </body>
    </html>
  )
}
