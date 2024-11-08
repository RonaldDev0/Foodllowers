/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useSupabase } from '../Providers'
import { z } from 'zod'
import { useUser } from '@/store'
import { Google } from './Google'
import { Info } from 'lucide-react'
import { useEncrypt } from '@/hooks'

type IUser = {
  [key: string]: any
  user: string,
  number: string,
  numberPrefix: string,
  aditionalInfo?: string,
}

type IProps = {
  isEdit?: boolean,
  value?: IUser | undefined,
  onOpen: any,
  isOpen: any,
  onOpenChange: any
  HeadLabel: string
}

const userSchema = z.object({
  user: z.string().min(4, 'Ingresa tu nomber y apellido.'),
  number: z.string().min(10, 'Número de contacto invalido.').max(10, 'Número de contacto invalido.'),
  numberPrefix: z.string(),
  aditionalInfo: z.string()
})

export function AddressForm ({ isEdit, value, HeadLabel, onOpen, isOpen, onOpenChange }: IProps) {
  const { supabase } = useSupabase()
  const { userId, setStore, addressList, darkMode } = useUser()

  const [address, setAddress] = useState<any>(null)
  const [addressError, setAddressError] = useState(false)
  const [user, setUser] = useState<IUser>({
    user: '',
    number: '',
    numberPrefix: '+57',
    aditionalInfo: ''
  })

  const [error, setError] = useState<any>({
    user: null,
    number: null,
    numberPrefix: null,
    aditionalInfo: null
  })

  const cleanUser = () => setUser({
    user: '',
    number: '',
    numberPrefix: '+57',
    aditionalInfo: ''
  })

  const handleChange = (field: string, event: any) => {
    const value = event.target.value

    if (error[field]) {
      setError((prev: any) => ({
        ...prev, [field]: null
      }))
    }

    setUser(prev => ({
      ...prev, [field]: value
    }))
  }

  const handleSubmit = async (onClose: any) => {
    const result = userSchema.safeParse(user)

    if (!result.success) {
      const formattedErrors = Object
        .entries(result.error.formErrors.fieldErrors)
        .reduce((acc: any, [key, value]) => {
          acc[key] = value[0]
          return acc
        }, {})
      setError(formattedErrors)
      return
    }
    if (!address) {
      setAddressError(true)
      return
    }
    setError({
      user: null,
      number: null,
      numberPrefix: null,
      aditionalInfo: null
    })

    if (isEdit && value) {
      const encrypted = await useEncrypt({
        key: userId,
        data: {
          ...user,
          ...address
        }
      })

      supabase
        .from('addresses')
        .update(encrypted)
        .eq('id', value.id)
        .select('*')
        .then(({ data, error }) => {
          if (error) return

          setStore(
            'addressList',
            addressList && [
              ...addressList
                .filter(({ id }) => id !== value.id),
              { id: data[0].id, user_id: userId, ...user, ...address }
            ]
          )
        })
        .then(() => onClose())
      return
    }

    const encrypted = await useEncrypt({
      key: userId,
      data: [{
        ...user,
        ...address,
        user_id: userId
      }]
    })

    supabase
      .from('addresses')
      .insert(encrypted)
      .select('id, user, number, numberPrefix, aditionalInfo, formatted_address, geometry')
      .then(({ data, error }) => {
        if (error) return

        setStore(
          'addressList',
          (data && addressList) && [...addressList, { id: data[0].id, user_id: userId, ...user, ...address }]
        )
      })
      .then(() => {
        cleanUser()
        setAddress(null)
        onClose()
      })
  }

  useEffect(() => {
    if (value) {
      const { user, number, numberPrefix, aditionalInfo, formatted_address, geometry } = value
      setAddress({ formatted_address, geometry })
      setUser({ user, number, numberPrefix, aditionalInfo })
    }
  }, [value])

  return (
    <>
      {
        !isEdit && (
          <Button
            color={darkMode ? 'secondary' : 'warning'}
            onPress={onOpen}
          >
            Agregar direccion
          </Button>
        )
      }
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='center'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {HeadLabel}
              </ModalHeader>
              <ModalBody>
                <div className='flex text-sm gap-2'>
                  <div>
                    <Info size={25} />
                  </div>
                  <p>Actualmente solo tenemos cobertura en la ciudad de bogota, colombia</p>
                </div>
                <Input
                  label='Nombre y apellido'
                  value={user.user}
                  onChange={(e: any) => handleChange('user', e)}
                  isInvalid={!!error.user}
                  errorMessage={error.user}
                />
                <Input
                  label='Número de contacto'
                  startContent='+57'
                  type='number'
                  value={user.number}
                  onChange={(e: any) => handleChange('number', e)}
                  isInvalid={!!error.number}
                  errorMessage={error.number}
                />
                <Google addressError={addressError} setAddress={setAddress} setAddressError={setAddressError} address={address} />
                <Input
                  label='Referencias adicionales de esta dirección'
                  placeholder='torre 3, apt 201'
                  value={user.aditionalInfo}
                  onChange={(e: any) => handleChange('aditionalInfo', e)}
                  isInvalid={!!error.aditionalInfo}
                  errorMessage={error.aditionalInfo}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color={darkMode ? 'secondary' : 'warning'}
                  onPress={() => {
                    try {
                      handleSubmit(onClose)
                    } catch (e) {
                      console.log('')
                    }
                  }}
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
