'use client'
import { useUser } from '@/store'
import { Card, CardBody, CardHeader, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Select, SelectItem } from '@nextui-org/react'
import { useEffect } from 'react'
import Link from 'next/link'

type IProps = {
  setError: Function
  pickUpInStore: boolean
  setPickUpInStore: Function
  kitchenAddress: string
}

export function AddressSelect ({ setError, pickUpInStore, setPickUpInStore, kitchenAddress }: IProps) {
  const { addressList, addressSelect, darkMode, setStore } = useUser()
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (addressList) {
      setStore('addressSelect', addressList[0])
    }
  }, [])

  useEffect(() => {
    if (!addressList || !addressSelect) {
      return
    }

    setError(false)
  }, [addressList, addressSelect])

  return (
    <>
      <Card>
        <CardHeader className='flex w-full justify-around z-0'>
          {pickUpInStore
            ? (
              <p>Dirección de entrega</p>
              )
            : (
              <p>Dirección de envio</p>
              )}
          <Button onPress={onOpen} variant='faded'>
            Cambiar
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className='p-3 rounded-lg'>
          {pickUpInStore
            ? (
              <div className='flex justify-around'>
                <p>Recoger en: </p>
                <Link
                  href={`https://maps.google.com/?q=${kitchenAddress}`}
                  className='text-purple-800'
                  target='_blank'
                >
                  {kitchenAddress}
                </Link>
              </div>
              )
            : addressList?.length
              ? (
                <>
                  <div className='flex w-full justify-between'>
                    <p className='font-bold'>
                      {addressSelect?.user}
                    </p>
                    <p>{addressSelect?.numberPrefix + ' ' + addressSelect?.number}</p>
                  </div>
                  <div className='flex w-full gap-2 justify-between'>
                    <p>{addressSelect?.formatted_address}</p>
                  </div>
                </>
                )
              : (
                <div className='flex flex-col gap-5'>
                  <p>No tienes ninguna dirección registrada</p>
                  <Link
                    className='dark:text-purple-800 text-yellow-400 font-semibold'
                    href='/adresses'
                  >
                    Agregar dirección
                  </Link>
                </div>
                )}
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='center'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='justify-center'>
                Selecciona tu dirección de envio
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-8'>
                  {addressList?.length
                    ? (
                      <Select
                        isDisabled={pickUpInStore}
                        placeholder='Selecciona una dirección'
                        defaultSelectedKeys={[addressSelect?.id.toString() || '']}
                        onChange={({ target: { value } }) => {
                          const address = addressList?.filter((item: any) => item.id === Number(value))[0]
                          setStore('addressSelect', address)
                        }}
                      >
                        {addressList.map((address: any) => (
                          <SelectItem
                            key={address.id}
                            value={address.id}
                            textValue={addressSelect?.user + ' - ' + addressSelect?.formatted_address}
                          >
                            <div className='flex justify-between'>
                              <div>
                                <p>{address.user}</p>
                                <p>{address.formatted_address}</p>
                              </div>
                              <p>{address.numberPrefix + ' ' + address.number}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>
                      )
                    : (
                      <div className='flex flex-col w-full justify-center items-center'>
                        <p>No tienes ninguna dirección registrada</p>
                        <Link
                          className='dark:text-purple-800 text-yellow-400 font-semibold'
                          href='/adresses'
                        >
                          Agregar dirección
                        </Link>
                      </div>
                      )}
                  <div className='w-full flex items-center justify-center'>
                    <Checkbox
                      isSelected={pickUpInStore}
                      onChange={() => setPickUpInStore(!pickUpInStore)}
                    >
                      Recojer en la cocina
                    </Checkbox>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color={darkMode ? 'secondary' : 'warning'}
                  onPress={onClose}
                  className='w-full font-semibold text-lg'
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
