import { ReactNode } from 'react'

import 'tailwindcss/tailwind.css'

export const metadata = {
  title: 'Foodllowers | 🍔 Food By Influencers',
  description: 'Foodllowers | 🍔 Food By Influencers'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-[#2f2f2f]'>
        {children}
      </body>
    </html>
  )
}
