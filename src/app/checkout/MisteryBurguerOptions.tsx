'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardBody, CardHeader, Divider, Button, Checkbox, Accordion, AccordionItem, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Info, X } from 'lucide-react'

type ICategory = {
  category: string
  items: {
    name: string
    checked: any
  }[]
}

const initialPreferences: ICategory[] = [
  // {
  //   category: 'Pan',
  //   items: [
  //     { name: 'Pan brioche a base de papa', checked: false },
  //     { name: 'Pan brioche a base de papa de colores', checked: false }
  //   ]
  // },
  {
    category: 'Carnes',
    items: [
      { name: 'Carne 150gr 100% res', checked: false },
      { name: 'Carne de cerdo desmechada 120gr', checked: false },
      { name: 'Pechuga de pollo apanada 120gr', checked: false },
      { name: 'Falafel (opción vegetariana)', checked: false }
    ]
  },
  {
    category: 'Quesos',
    items: [
      { name: 'Lonja de queso campesino', checked: false },
      { name: 'Queso doble crema tajado', checked: false }
    ]
  },
  {
    category: 'Vegetales',
    items: [
      { name: 'Lechuga romana', checked: false },
      { name: 'Lechuga crespa', checked: false },
      { name: 'Cebollín', checked: false },
      { name: 'Pico de gallo', checked: false },
      { name: 'Cebolla encurtida', checked: false },
      { name: 'Cole slaw', checked: false }
    ]
  },
  {
    category: 'Extras',
    items: [
      { name: 'Tocineta', checked: false },
      { name: 'Piña caramelizada', checked: false },
      { name: 'Piña en almíbar', checked: false },
      { name: 'Plátanos maduros', checked: false }
    ]
  },
  {
    category: 'Salsas',
    items: [
      { name: 'Salsa de vino', checked: false },
      { name: 'Sour cream', checked: false },
      { name: 'Queso cheddar', checked: false },
      { name: 'Salsa BBQ', checked: false },
      { name: 'Tres quesos (de la casa)', checked: false }
    ]
  },
  {
    category: 'Acompañantes',
    items: [
      { name: 'Papas a la francesa', checked: false },
      { name: 'Totopos', checked: false }
    ]
  }
]

export function MisteryBurguerOptions ({ setValue }: { setValue: Function }) {
  const query = useSearchParams().get('q')
  const isMisteryBurguer = query === '471ba020-79b7-4204-9e9d-2e8ca2b0f216'
  const [preferences, setPreferences] = useState<any>(initialPreferences)
  const [showPreferences, setShowPreferences] = useState<any>(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [error, setError] = useState<any>(false)

  const handleChange: (category: string, itemName: string) => void = (category, itemName) => {
    setError(false)
    setPreferences((prevPreferences: any[]) =>
      prevPreferences.map((categoryObj) =>
        categoryObj.category === category
          ? {
              ...categoryObj,
              items: categoryObj.items.map((item: { name: string; checked: any }) =>
                item.name === itemName
                  ? { ...item, checked: !item.checked }
                  : item
              )
            }
          : categoryObj
      ))
  }

  function validation () {
    // almenos un tipo de pan
    // if (preferences[0].items.filter(({ checked }: any) => checked === true).length === preferences[0].items.length) {
    //   setError('Debes dejar al menos un tipo de pan disponible.')
    //   return true
    // }
    // minimum 6 ingredients
    const ingredients = preferences
      .filter(({ category }: any) => category !== 'Salsas' && category !== 'Acompañantes' && category !== 'Pan')
      .flatMap(({ items }: ICategory) => items)
      .filter(({ checked }: any) => checked === false)
      .length

    if (ingredients < 5) {
      setError('Debes dejar al menos 5 ingredientes disponibles, sin contar panes, salsas y acompañantes.')
      return true
    }

    return false
  }

  const handleSubmit = (onClose: Function) => {
    if (validation()) return

    const preferencesFormatted = preferences
      .map(({ items }: ICategory) => (
        items.filter(({ checked }: any) => checked).map(({ name }: any) => name)
      )).flat()

    setShowPreferences(preferencesFormatted.length ? preferencesFormatted : null)
    setValue(preferences)
    onClose()
  }

  useEffect(() => {
    setValue(initialPreferences)
    onOpen()
  }, [])

  if (!isMisteryBurguer) return null
  return (
    <>
      <Card>
        <CardHeader className='flex w-full justify-around'>
          <p>Ingredientes a evitar</p>
          <Button
            variant='faded'
            onPress={onOpen}
          >
            Cambiar
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className='max-w-96'>
          {showPreferences?.map((item: string) => (
            <p key={item}>{item}</p>
          )) || (
            <p>No has elegido ingredientes para evitar. <br /> ¡Marca los que prefieres excluir!</p>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                ¡Tu Sorpresa Gastronómica!
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-12'>
                  <div className='flex gap-3 items-center text-sm'>
                    <Info size={60} />
                    <p>Marca los ingredientes que prefieres evitar. <br /> Si no te importa, simplemente deja todas las opciones sin marcar y déjate sorprender.</p>
                  </div>
                  <div>
                    <p className='text-pink-800 font-bold'>{error || ''}</p>
                    <Accordion>
                      {preferences.map(({ category, items }: any) => (
                        <AccordionItem key={category} aria-label={category} title={category}>
                          <div className='flex flex-col'>
                            {items.map(({ name, checked }: any) => (
                              <Checkbox
                                key={name}
                                color='danger'
                                lineThrough
                                icon={<X size={20} />}
                                isSelected={checked}
                                onChange={() => handleChange(category, name)}
                              >
                                {name}
                              </Checkbox>
                            ))}
                          </div>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => handleSubmit(onClose)}
                  color='secondary'
                  className={`w-full text-lg ${error ? 'opacity-60' : ''}`}
                  isDisabled={error}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
