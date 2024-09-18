'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Checkbox, Accordion, AccordionItem } from '@nextui-org/react'
import { Info, X } from 'lucide-react'

const categories = [
  {
    title: 'Pan',
    items: ['Pan brioche a base de papa', 'Pan brioche a base de papa de colores']
  },
  {
    title: 'Carnes',
    items: [
      'Carne 150gr 100% res',
      'Carne de cerdo desmechada 120gr',
      'Pechuga de pollo apanada 120gr',
      'Falafel (opción vegetariana)'
    ]
  },
  {
    title: 'Quesos',
    items: ['Lonja de queso campesino', 'Queso doble crema tajado']
  },
  {
    title: 'Vegetales',
    items: [
      'Lechuga romana',
      'Lechuga crespa',
      'Cebollín',
      'Pico de gallo',
      'Cebolla encurtida',
      'Cole slaw'
    ]
  },
  {
    title: 'Extras',
    items: [
      'Tocineta',
      'Piña caramelizada',
      'Piña en almíbar',
      'Plátanos maduros',
      'Totopos'
    ]
  },
  {
    title: 'Salsas',
    items: [
      'Salsa de vino',
      'Sour cream',
      'Queso cheddar',
      'Salsa BBQ',
      'Tres quesos (de la casa)'
    ]
  },
  {
    title: 'Acompañantes',
    items: ['Papas a la francesa', 'Totopos']
  }
]

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
                    <Info size={60} />
                    <p>Marca los ingredientes que prefieres evitar. <br /> Si no te importa, simplemente deja todas las opciones sin marcar y déjate sorprender.</p>
                  </div>
                  <div>
                    <Accordion>
                      {categories.map(({ title, items }) => (
                        <AccordionItem
                          key={title}
                          aria-label={title}
                          title={title}
                        >
                          <div className='flex flex-col'>
                            {items.map(item => (
                              <Checkbox
                                key={item}
                                color='danger'
                                lineThrough
                                icon={<X size={20} />}
                              >
                                {item}
                              </Checkbox>
                            ))}
                          </div>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
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
