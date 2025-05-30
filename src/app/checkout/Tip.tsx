'use client'
import { useEffect } from 'react'
import { Card, CardHeader, CardBody, Divider, Slider } from '@nextui-org/react'
import { useUser } from '@/store'
interface IProps {
  amount: number
  setTip: Function
  pickUpInStore: boolean
}

export function Tip ({ amount, setTip, pickUpInStore }: IProps) {
  const { darkMode } = useUser()
  const handleChangeTip = (e: any) => {
    setTip(amount * e)
  }

  useEffect(() => {
    setTip(amount * 0.05)
  }, [pickUpInStore])

  return (
    <Card className='border border-white border-opacity-10'>
      <CardHeader className='flex justify-between gap-4 z-0'>
        <p>Añade una propina</p>
        <p className='text-sm opacity-70'>Esta recompensa va para el Domiciliario</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex justify-center'>
          <Slider
            label='Propina:'
            color={darkMode ? 'secondary' : 'warning'}
            showTooltip
            step={0.01}
            formatOptions={{ style: 'percent' }}
            maxValue={1}
            minValue={0}
            isDisabled={pickUpInStore}
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
