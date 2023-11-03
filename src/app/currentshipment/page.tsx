'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { Stepper } from './Stepper'
import { useSupabase } from '../Providers'

const steps = ['buscando cocina...', 'cocinando...', 'buscando delivery', 'recogiendo...', 'entregando...', 'entregado']

export default function CurrentShipment () {
  const { supabase } = useSupabase()
  const query = useSearchParams().get('q')
  const [activeStep, setActiveStep] = useState(0)

  const back = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const next = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  useEffect(() => {
    supabase.channel('orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        payload => console.log({ payload })
      ).subscribe()
  }, [])

  return (
    <div className='h-screen grid place-content-center'>
      <p className='text-center'>{query}</p>
      <Stepper activeStep={activeStep} steps={steps} />

      <div className='flex justify-around'>
        <Button onPress={back}>
          Back
        </Button>
        <Button color='primary' onPress={next}>
          Next
        </Button>
      </div>
    </div>
  )
}
