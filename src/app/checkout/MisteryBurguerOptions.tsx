'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Checkbox, Accordion, AccordionItem, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Pagination, Chip } from '@nextui-org/react'
import { Info, X, PlusCircle, MinusCircle } from 'lucide-react'
import { useUser } from '@/store'

type ICategory = {
  category: string
  items: {
    name: string
    checked: any
  }[]
}

type IPreferences = {
  isCombo: boolean
  categories: ICategory[]
}

type IProps = {
  setValue: Function
  numberOfProducts: number
  setNumberOfProducts: Function
}

const initialPreferences: IPreferences = {
  isCombo: false,
  categories: [
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
        { name: 'Papas a la francesa', checked: true },
        { name: 'Totopos', checked: true }
      ]
    },
    {
      category: 'Bebidas',
      items: [
        { name: 'jugo de Mora', checked: true },
        { name: 'jugo de Mango', checked: true },
        { name: 'jugo de Lulo', checked: true },
        { name: 'jugo de Maracuyá', checked: true },
        { name: 'jugo de Fresa', checked: true },
        { name: 'Quatro', checked: true },
        { name: 'Coca Cola', checked: true },
        { name: 'Kola Roman', checked: true }
      ]
    }
  ]
}

export function MisteryBurguerOptions ({ setValue, numberOfProducts, setNumberOfProducts }: IProps) {
  const { darkMode } = useUser()
  const query = useSearchParams().get('q')
  const isMisteryBurguer = query === '471ba020-79b7-4204-9e9d-2e8ca2b0f216'
  const [preferences, setPreferences] = useState<any>(Array.from({ length: numberOfProducts }, () => initialPreferences))
  const [showPreferences, setShowPreferences] = useState<any>(null)
  const [step, setStep] = useState(0)
  const [allTheSame, setAllTheSame] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [error, setError] = useState<any>(false)

  function handleChange (category: string, itemName: string) {
    setError(false)

    setPreferences((prevPreferences: IPreferences[]) =>
      prevPreferences.map((innerObject, index) =>
        index === step
          ? {
              ...innerObject,
              categories: innerObject.categories.map(categoryObj =>
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
              )
            }
          : innerObject
      )
    )
  }

  function validation () {
    // Mínimo 5 ingredientes
    const errors = preferences.map((innerObject: IPreferences, index: number) => {
      const ingredients = innerObject.categories
        .filter(({ category }: any) => category !== 'Salsas' && category !== 'Acompañantes' && category !== 'Pan' && category !== 'Bebidas')
        .flatMap(({ items }: ICategory) => items)
        .filter(({ checked }: any) => checked === false)
        .length

      return ingredients < 5 ? index + 1 : null
    })

    const firstErrorStep = errors.find((error: any) => error !== null)

    if (firstErrorStep !== undefined) {
      setError(`Debes dejar al menos 5 ingredientes disponibles, sin contar salsas y acompañantes. Error en el producto: ${firstErrorStep}`)
      return true
    }

    return false
  }

  const handleSubmit = (onClose: Function) => {
    if (validation()) return
    const preferencesSaved = preferences[0]

    const formattedByProducts = preferences.map((innerObject: IPreferences) =>
      innerObject.categories.map(({ category, items }: ICategory) =>
        items
          .filter(({ checked }: any) =>
            checked && (innerObject.isCombo || (category !== 'Acompañantes' && category !== 'Bebidas'))
          )
          .map(({ name }: any) => name)
      ).flat()
    )

    setShowPreferences(formattedByProducts)
    setValue(preferences)
    onClose()

    if (allTheSame) {
      setStep(0)
      setPreferences(Array.from({ length: numberOfProducts }, () => preferencesSaved))
    }
  }

  const minus = () => {
    if (numberOfProducts > 1) {
      setNumberOfProducts(numberOfProducts - 1)
      if (step + 1 === numberOfProducts) setStep(step - 1)
    }
  }

  const plus = () => {
    if (numberOfProducts < 5) {
      setNumberOfProducts(numberOfProducts + 1)
    }
  }

  useEffect(() => {
    setValue([initialPreferences])
    onOpen()
  }, [])

  useEffect(() => {
    setPreferences((prev: any) => Array.from({ length: numberOfProducts }, (_, index) => {
      if (index <= prev.length - 1) return prev[index]
      return initialPreferences
    }))
  }, [numberOfProducts])

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
          {showPreferences?.[step] && showPreferences[step].length > 0
            ? (
                showPreferences[step].map((item: string) => (
                  <p key={item}>{item}</p>
                ))
              )
            : (
              <p>No has elegido ingredientes para evitar. <br /> ¡Marca los que prefieres excluir!</p>
              )}
        </CardBody>
        <CardFooter className='flex justify-center items-center'>
          {
            numberOfProducts > 1 && (
              !allTheSame
                ? (
                  <Pagination
                    total={numberOfProducts}
                    page={step + 1}
                    onChange={(page: number) => setStep(page - 1)}
                  />
                  )
                : <p>Todas las hamburguesas comparten preferencias</p>
            )
          }
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                ¡Tu Sorpresa Gastronómica!
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-3 items-center text-sm'>
                    <Info size={60} />
                    <p>Marca los ingredientes que prefieres evitar. <br /> Si no te importa, simplemente deja todas las opciones sin marcar y déjate sorprender.</p>
                  </div>
                  <div>
                    <p className='text-pink-800 font-bold'>{error || ''}</p>
                    <Accordion>
                      {preferences[step]?.categories
                        .filter(({ category }: ICategory) => !(category === 'Acompañantes' || category === 'Bebidas') || preferences[step].isCombo)
                        .map(({ category, items }: ICategory) => (
                          <AccordionItem
                            key={category}
                            aria-label={category}
                            title={(
                              <div className='flex justify-between'>
                                <p>{category}</p>
                                {preferences[step].isCombo && (category === 'Bebidas' || category === 'Acompañantes') && (
                                  <Chip size='sm' color='primary'>
                                    combo
                                  </Chip>
                                )}
                              </div>
                            )}
                          >
                            <div className='flex flex-col'>
                              {items.map(({ name, checked }) => (
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
                  <div>
                    <Checkbox
                      isSelected={preferences[step]?.isCombo}
                      onChange={() => {
                        setPreferences(preferences.map((item: any, index: number) => index === step
                          ? {
                              ...item,
                              isCombo: !item.isCombo,
                              categories: item.categories.map((categoryObject: ICategory) => {
                                const newValue = {
                                  ...categoryObject,
                                  items: categoryObject.items.map((item: any) => ({ ...item, checked: !item.checked }))
                                }

                                switch (categoryObject.category) {
                                  case 'Acompañantes':
                                    return newValue
                                  case 'Bebidas':
                                    return newValue
                                  default:
                                    return categoryObject
                                }
                              })
                            }
                          : item))
                      }}
                    >
                      Quieres la hamburguesa en combo?
                    </Checkbox>
                    <p className='opacity-60'>Esto te genera un costo de 6.000 COP</p>
                  </div>
                  <div className='flex justify-between items-center gap-6 mb-2 w-full h-full'>
                    <p>cantidad:</p>
                    <div className='flex gap-4 justify-center items-center'>
                      <MinusCircle
                        size={30}
                        className={`cursor-pointer ${numberOfProducts === 1 ? 'opacity-50' : ''} transition-all`}
                        onClick={minus}
                      />
                      <p>{numberOfProducts}</p>
                      <PlusCircle
                        size={30}
                        className={`cursor-pointer ${numberOfProducts === 5 ? 'opacity-50' : ''} transition-all`}
                        onClick={plus}
                      />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-8 items-center justify-center'>
                    {
                      numberOfProducts > 1 && (
                        <Checkbox
                          isSelected={allTheSame}
                          onChange={() => setAllTheSame(!allTheSame)}
                        >
                          Todas las hamburguesas comparten preferencias?
                        </Checkbox>
                      )
                    }
                    {
                      !allTheSame && (
                        <Pagination
                          total={numberOfProducts}
                          page={step + 1}
                          onChange={(page: number) => setStep(page - 1)}
                        />
                      )
                    }
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => handleSubmit(onClose)}
                  color={darkMode ? 'secondary' : 'warning'}
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
