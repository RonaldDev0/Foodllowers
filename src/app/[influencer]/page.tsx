'use client'

import { useContent } from '@/context'
import { Banner } from './Banner'
import { ProductList } from './ProductList'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function NotFound () {
  return (
    <div className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
      <h1 className='text-4xl'>404</h1>
      <Image src='img/pato404.svg' alt='404 error' width='400' height='400' />
      <h2 className='text-2xl'>Page not found</h2>
      <Link className='text-xl text-green-600' href='/'>Back to Home</Link>
    </div>
  )
}
function Page ({ influencer }: any) {
  return (
    <div>
      <Banner influencer={influencer} />
      <ProductList influencerId={influencer} />
    </div>
  )
}

export default function InfluencerPage ({ params: { influencer } }: any) {
  const { influencerList } = useContent()
  const Influencer = influencerList.filter(({ path }) => path === `/${influencer}`)

  return (
    <Elements stripe={stripePromise} options={{ appearance: { theme: 'night' } }}>
      {
        Influencer.length > 0 ? <Page influencer={Influencer[0]} /> : <NotFound />
      }
    </Elements>
  )
}
