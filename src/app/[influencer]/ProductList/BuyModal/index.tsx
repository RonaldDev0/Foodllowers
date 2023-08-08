'use client'
// import { AddressElement, CardElement } from '@/components'
import { Modal } from './Modal'
import { Elements, AddressElement, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@/context'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function BuyModal () {
  const { user } = useUser()
  return (
    <Modal>
      <Elements stripe={stripePromise} options={{ appearance: { theme: 'night' } }}>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 w-96'>
          <AddressElement
            className='bg-zinc-900 p-4 rounded-md'
            options={{
              mode: 'shipping',
              allowedCountries: ['CO'],
              autocomplete: {
                mode: 'automatic'
              },
              fields: {
                phone: 'always'
              },
              validation: {
                phone: {
                  required: 'always'
                }
              },
              defaultValues: {
                name: user.full_name,
                address: {
                  country: 'CO',
                  city: 'Bogotá'
                }
              }
            }}
          />
          <CardElement
            className='bg-zinc-900 p-4 rounded-md'
            options={{
              hidePostalCode: true,
              iconStyle: 'solid',
              style: {
                base: {
                  fontSize: '16px',
                  color: 'white'
                }
              }
            }}
          />
          <button className='bg-zinc-900 hover:bg-zinc-700 transition-all p-2 rounded-md text-2xl'>
            pay
          </button>
        </form>
      </Elements>
    </Modal>
  )
}
