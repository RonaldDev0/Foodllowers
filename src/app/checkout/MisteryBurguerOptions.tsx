'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Textarea } from '@nextui-org/react'
import { Info } from 'lucide-react'

export function MisteryBurguerOptions ({ value, setValue }: { value: any, setValue: Function }) {
  const query = useSearchParams().get('q')
  const isMisteryBurguer = query === '471ba020-79b7-4204-9e9d-2e8ca2b0f216'

  const [open, setIsOpen] = useState(true)

  const handleSubmit = () => {
    setIsOpen(false)
  }

  if (!isMisteryBurguer) return null
  return (
    <>
      <Card>
        <CardHeader className='flex w-full justify-around'>
          <p>Ingredientes a evitar</p>
          <Button
            variant='faded'
            onPress={() => setIsOpen(true)}
          >
            Cambiar
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          {value || 'No has escrito nada.'}
        </CardBody>
      </Card>
      {
        open && (
          <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex justify-center items-center'>
            <Card className='p-2'>
              <CardHeader className='flex w-full justify-center'>
                <p>¡Tu Sorpresa Gastronómica!</p>
              </CardHeader>
              <Divider />
              <CardBody className='p-5 rounded-lg flex flex-col gap-5 w-96'>
                <div className='flex flex-col gap-12'>
                  <div className='flex gap-3 items-center text-sm'>
                    <Info size={40} />
                    <p>¿Hay algún ingrediente que prefieras evitar? Escríbelo aquí.<br /> Si no, deja la caja vacía y déjate sorprender.</p>
                  </div>
                  <Textarea
                    placeholder='¡Sin cebolla, por favor!'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    size='lg'
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  onPress={handleSubmit}
                  color='secondary'
                  className='w-full text-lg'
                >
                  Confirmar
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      }
    </>
  )
}
