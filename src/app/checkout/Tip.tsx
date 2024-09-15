'use client'
import { useEffect } from 'react'
import { Card, CardHeader, CardBody, Divider, Slider } from '@nextui-org/react'

interface IProps {
  amount: number
  setTip: Function
  serviceFee: number
  influencer: number
}

export function Tip ({ amount, setTip, serviceFee, influencer }: IProps) {
  const handleChangeTip = (e: any) => {
    const tip = (amount + serviceFee + influencer) * e
    setTip(tip)
  }

  useEffect(() => {
    setTip((amount + serviceFee + influencer) * 0.05)
  }, [])

  return (
    <Card>
      <CardHeader className='flex justify-between z-0'>
        <p>Añade una propina</p>
        <p className='text-sm'>Esta recompensa va para el Domiciliario</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex justify-center'>
          <Slider
            label='Propina:'
            color='secondary'
            showTooltip
            step={0.01}
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
            defaultValue={0.05}
            className='max-w-md'
            onChangeEnd={handleChangeTip}
          />
        </div>
      </CardBody>
    </Card>
  )
}
