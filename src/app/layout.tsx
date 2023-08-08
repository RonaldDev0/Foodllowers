'use client'

import { ReactNode } from 'react'
import { SupabaseProvider } from './supabaseProvider'
import { UserProvider, ContentProvider } from '@/context'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Components
import { SideBarr } from '@/components'

import 'tailwindcss/tailwind.css'
import './globals.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const metadata = {
  title: 'Foodllowers | 🍔 Food By Influencers',
  description: 'Foodllowers | 🍔 Food By Influencers',
  manifest: 'manifest.json'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='w-full h-screen flex flex-col top-12 items-center'>
        <SupabaseProvider>
          <UserProvider>
            <ContentProvider>
              <Elements stripe={stripePromise} options={{ appearance: { theme: 'night' } }}>
                <SideBarr />
                {children}
              </Elements>
            </ContentProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
