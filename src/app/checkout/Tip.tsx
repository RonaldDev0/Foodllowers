'use client'
import { useEffect } from 'react'
import { Card, CardHeader, CardBody, Divider, RadioGroup, Radio, cn } from '@nextui-org/react'

function CustomRadio ({ children, ...otherProps }: any) {
  return (
    <Radio
      {...otherProps}
      color='secondary'
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content2 hover:bg-content3 items-center justify-between',
          'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-secondary'
        )
      }}
    >
      {children}
    </Radio>
  )
}

export function Tip ({ amount, setTip }: { amount: number, setTip: Function }) {
  const handleChangeTip = (e: any) => {
    const porcentaje = parseInt(e.target.value)
    const tip = amount * (porcentaje / 100)
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
        <RadioGroup defaultValue='10' onChange={handleChangeTip}>
          <div className='flex justify-around [@media(max-width:800px)]:grid [@media(max-width:800px)]:grid-cols-2 [@media(max-width:800px)]:gap-5'>
            <CustomRadio value='5'>
              5%
            </CustomRadio>
            <CustomRadio value='10'>
              10%
            </CustomRadio>
            <CustomRadio value='15'>
              15%
            </CustomRadio>
            <CustomRadio value='0'>
              0
            </CustomRadio>
          </div>
        </RadioGroup>
      </CardBody>
    </Card>
  )
}
