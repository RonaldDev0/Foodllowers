'use client'
import { CardElement } from '@stripe/react-stripe-js'

export function Form () {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className='bg-gray-900 p-4 rounded-md'
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
    </form>
  )
}
