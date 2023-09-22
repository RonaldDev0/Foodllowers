import { ReactNode } from 'react'
import { SupabaseProvider } from './supabaseProvider'
import { UserProvider, ContentProvider } from '@/context'

// Components
import { SideBarr } from '@/components'

import 'tailwindcss/tailwind.css'
import './globals.css'

export const metadata = {
  title: 'Foodllowers | 🍔 Food By Influencers',
  description: 'Foodllowers | 🍔 Food By Influencers',
  manifest: 'manifest.json'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className='w-full h-screen flex flex-col top-12 items-center dark:bg-gradient-to-r dark:from-blue-950 dark:to-black'>
        <SupabaseProvider>
          <UserProvider>
            <ContentProvider>
              <SideBarr />
              {children}
            </ContentProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
