'use client'
import { useEffect } from 'react'
import { Card, CardHeader, CardBody, Divider, Slider } from '@nextui-org/react'

export function Tip ({ amount, setTip, serviceFee }: { amount: number, setTip: Function, serviceFee: number }) {
  const handleChangeTip = (e: any) => {
    const tip = (amount + serviceFee) * e
    setTip(tip)
  }

  useEffect(() => {
    setTip(amount * (10 / 100))
  }, [])

  return (
    <Card>
      <CardHeader className='flex justify-between'>
        <p>Añade una propina</p>
        <p className='text-sm'>El 100% de esta recompensa va para el Domiciliario</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <Slider
          label='Propina:'
          color='secondary'
          showTooltip
          step={0.2}
          formatOptions={{ style: 'percent' }}
          maxValue={1}
          minValue={0}
          marks={[
            {
              value: 0.2,
              label: '20%'
            },
            {
              value: 0.5,
              label: '50%'
            },
            {
              value: 0.8,
              label: '80%'
            }
          ]}
          defaultValue={0.2}
          className='max-w-md'
          onChange={handleChangeTip}
        />
      </CardBody>
    </Card>
  )
}
