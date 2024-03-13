'use client'
import { useUser } from '@/store'
import { Card, CardBody, CardHeader, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useEffect } from 'react'
import { useSupabase } from '../Providers'
import Link from 'next/link'

export function AddressSelect ({ setError }: { setError: Function }) {
  const { supabase } = useSupabase()
  const { addressList, addressSelect, setStore } = useUser()
  const { onOpen, isOpen, onOpenChange } = useDisclosure()

  const handleChangeAddress = (onClose: Function, address: any) => {
    setStore('addressSelect', address)
    onClose()
  }

  useEffect(() => {
    if (addressList) {
      setStore('addressSelect', addressList[0])
      return
    }

    supabase
      .from('addresses')
      .select('id, user, number, numberPrefix, aditionalInfo, formatted_address, geometry')
      .then(({ data }: any) => {
        if (data.length > 0) {
          setStore('addressSelect', data[0])
          setStore('addressList', data)
          return
        }

        setError({ message: 'Address invalid' })
      })

    if (!addressList || !addressSelect) {
      return
    }

    setError(false)
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
        <CardHeader className='flex w-full justify-around'>
          <p>Dirección de envio</p>
          <Button onPress={onOpen} variant='faded'>
            Cambiar
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className='p-5 rounded-lg flex flex-col gap-5'>
          {(!addressList || addressList.length === 0)
            ? (
              <div className='flex flex-col gap-5'>
                <p>No tienes ninguna dirección registrada</p>
                <Link className='text-purple-800 font-semibold' href='/adresses'>Agregar dirección</Link>
              </div>
              )
            : (
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
              <ModalHeader>
                Selecciona tu dirección de envio
              </ModalHeader>
              <ModalBody>
                {addressList?.map(address => (
                  <div
                    key={address.id}
                    onClick={() => handleChangeAddress(onClose, address)}
                    className='bg-purple-800 bg-opacity-20 hover:bg-opacity-40 transition-all rounded-lg p-3 cursor-pointer flex justify-between'
                  >
                    <div>
                      <p>{address.user}</p>
                      <p>{address.formatted_address}</p>
                    </div>
                    <p>{address.numberPrefix + ' ' + address.number}</p>
                  </div>
                ))}
                {(!addressList || addressList.length === 0) && (
                  <div className='flex flex-col gap-5'>
                    <p>No tienes ninguna dirección registrada</p>
                    <Link className='text-purple-800 font-semibold' href='/adresses'>Agregar dirección</Link>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={onClose}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
