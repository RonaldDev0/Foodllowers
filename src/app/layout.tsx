import { ReactNode } from 'react'
import { SupabaseProvider } from './supabaseProvider'
import { UserProvider, ContentProvider } from '@/context'
import { Quicksand } from 'next/font/google'

// Components
import { SideBarr } from '@/components'

import 'tailwindcss/tailwind.css'
import './globals.css'

const quicksand = Quicksand({ subsets: ['vietnamese'] })

export const metadata = {
  title: 'Foodllowers | 🍔 Food By Influencers',
  description: 'Foodllowers | 🍔 Food By Influencers',
  manifest: 'manifest.json'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${quicksand.className} bg-bg text-white`}>
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
