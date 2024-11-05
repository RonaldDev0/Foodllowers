'use client'
import { useState } from 'react'
import { Card, CardHeader, CardBody, Divider, Input, Button } from '@nextui-org/react'
import { X } from 'lucide-react'
import { useSupabase } from '../Providers'

interface IProps {
  haveCoupon: boolean
  setHaveCoupon: Function
  coupon: string
  setCoupon: Function
}

export function DiscountCoupon ({ haveCoupon, setHaveCoupon, coupon, setCoupon }: IProps) {
  const { supabase } = useSupabase()
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (e: any) => {
    setError(false)
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    supabase
      .from('coupons')
      .select('id')
      .eq('code', input)
      .then(({ error, data }) => {
        if (error || data.length === 0) return setError(true)

        setHaveCoupon(true)
        setCoupon(input)
      })
  }

  return (
    <Card className='border border-white border-opacity-10'>
      <CardHeader className='flex justify-between z-0'>
        tienes un cupón de descuento?
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex justify-between gap-2'>
          {haveCoupon
            ? (
              <div className='flex justify-between items-center w-full px-4'>
                <p>{coupon}</p>
                <X
                  size={25}
                  className='cursor-pointer'
                  onClick={() => setHaveCoupon(false)}
                />
              </div>
              )
            : (
              <>
                <Input
                  placeholder='cupon'
                  value={input}
                  onChange={handleChange}
                  isInvalid={error}
                  errorMessage='cupón inválido'
                />
                <Button
                  variant='faded'
                  onPress={handleSubmit}
                  isDisabled={haveCoupon}
                >
                  Aplicar
                </Button>
              </>
              )}
        </div>
      </CardBody>
    </Card>
  )
}
