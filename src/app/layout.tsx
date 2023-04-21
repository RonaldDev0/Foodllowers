import { ReactNode } from 'react'
import { SupabaseProvider } from './supabaseProvider'

import 'tailwindcss/tailwind.css'

export const metadata = {
  title: 'Foodllowers | 🍔 Food By Influencers',
  description: 'Foodllowers | 🍔 Food By Influencers'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-[#2f2f2f] text-white'>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
