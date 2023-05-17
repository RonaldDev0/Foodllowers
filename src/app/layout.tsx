import { ReactNode } from 'react'
import { SupabaseProvider } from './supabaseProvider'
import { UserProvider } from '@/context/user'

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
    <html lang='en'>
      <body className='bg-bg text-white'>
        <SupabaseProvider>
          <UserProvider>
            <SideBarr />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
