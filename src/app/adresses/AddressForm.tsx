'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useSupabase } from '../Providers'
import { z } from 'zod'
import { useUser } from '@/store'

type IAddress = {
  [key: string]: any
  user: string,
  number: string,
  numberPrefix: string,
  country: string,
  city: string,
  localidad: string,
  address: {
    streetType: string
    value1: string,
    value2: string,
    value3?: string
  },
  aditionalInfo?: string
}

type IProps = {
  isEdit?: boolean,
  value?: IAddress | undefined,
  HeadLabel: string,
  onOpen: any,
  isOpen: any,
  onOpenChange: any
}

const addressSchema = z.object({
  user: z.string().min(4, 'Ingresa tu nomber y apellido.'),
  number: z.string().min(10, 'Número de contacto invalido.').max(10, 'Número de contacto invalido.'),
  numberPrefix: z.string(),
  country: z.string().min(2, 'Selecciona tu país.'),
  city: z.string().min(2, 'Selecciona tu ciudad.'),
  localidad: z.string().min(2, 'Selecciona tu localidad.'),
  address: z.object({
    streetType: z.string().min(2, 'Selecciona el tipo de calle.'),
    value1: z.string().min(1, 'Completa este campo.'),
    value2: z.string().min(1, 'Completa este campo.'),
    value3: z.string().min(1, 'Completa este campo.')
  }),
  aditionalInfo: z.string()
})

const localidades = [
  // 'Antonio Nariño',
  // 'Barrios Unidos',
  // 'Bosa',
  'Chapinero',
  // 'Ciudad Bolívar',
  // 'Engativá',
  'Fontibón',
  'Kennedy',
  // 'La Candelaria',
  // 'Los Mártires',
  // 'Puente Aranda',
  // 'Rafael Uribe Uribe',
  // 'San Cristóbal',
  // 'Santa Fe',
  'Suba'
  // 'Sumapaz',
  // 'Teusaquillo',
  // 'Tunjuelito',
  // 'Usaquén',
  // 'Usme'
]

const streetTypes = [
  'Avenida',
  'Avenida Calle',
  'Avenida Carrera',
  'Calle',
  'Carrera',
  'Circular',
  'Circunvalar',
  'Diagonal',
  'Manzana',
  'Transversal',
  'Via'
]

export function AddressForm ({ isEdit, value, HeadLabel, onOpen, isOpen, onOpenChange }: IProps) {
  const { supabase } = useSupabase()
  const { userId, setStore, addressList } = useUser()

  const [address, setAddress] = useState<IAddress>({
    user: '',
    number: '',
    numberPrefix: '+57',
    country: 'Colombia',
    city: 'Bogotá',
    localidad: '',
    address: {
      streetType: 'Calle',
      value1: '',
      value2: '',
      value3: ''
    },
    aditionalInfo: ''
  })

  const [error, setError] = useState<any>({
    user: null,
    number: null,
    numberPrefix: null,
    country: null,
    city: null,
    localidad: null,
    address: {
      streetType: null,
      value1: null,
      value2: null,
      value3: null
    },
    aditionalInfo: null
  })

  const cleanAddress = () => setAddress({
    user: '',
    number: '',
    numberPrefix: '+57',
    country: 'Colombia',
    city: 'Bogotá',
    localidad: '',
    address: {
      streetType: 'Calle',
      value1: '',
      value2: '',
      value3: ''
    },
    aditionalInfo: ''
  })

  const handleChange = (field: string, event: any) => {
    const value = event.target.value

    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (error[parent] && error[parent][child]) {
        setError((prev: any) => ({ ...prev, [parent]: { ...prev[parent], [child]: null } }))
      }
      setAddress(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }))
      return
    } else if (error[field]) {
      setError((prev: any) => ({ ...prev, [field]: null }))
    }

    setAddress(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (onClose: any) => {
    const result = addressSchema.safeParse(address)

    if (!result.success) {
      const formattedErrors = Object.entries(result.error.formErrors.fieldErrors).reduce((acc: any, [key, value]) => {
        if (value.length === 1) {
          console.log(value, 'es este!')
          acc[key] = value[0]
        } else if (value.length > 1) {
          acc[key] = { streetType: ' ', value1: value[0], value2: value[1], value3: value[2] }
        }
        return acc
      }, {})
      setError(formattedErrors)
      return
    }
    setError({
      user: null,
      number: null,
      numberPrefix: null,
      country: null,
      city: null,
      localidad: null,
      address: {
        streetType: null,
        value1: null,
        value2: null,
        value3: null
      },
      aditionalInfo: null
    })

    if (isEdit && value) {
      supabase
        .from('addresses')
        .update(address)
        .eq('id', value.id)
        .select()
        .then(({ data }) => setStore('addressList', (data && addressList) && [...addressList.filter(({ id }) => id !== value.id), ...data]))
        .then(cleanAddress)
        .then(() => onClose())
      return
    }

    supabase
      .from('addresses')
      .insert([{ ...address, user_id: userId }])
      .select()
      .then(({ data }) => setStore('addressList', (data && addressList) && [...addressList, ...data]))
      .then(cleanAddress)
      .then(() => onClose())
  }

  useEffect(() => {
    value && setAddress(value)
  }, [value])

  return (
    <>
      {
        !isEdit && (
          <Button color='primary' onPress={onOpen}>
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
                <Input
                  label='Nombre y apellido'
                  value={address.user}
                  onChange={e => handleChange('user', e)}
                  isInvalid={!!error.user}
                  errorMessage={error.user}
                />
                <Input
                  label='Número de contacto'
                  startContent='+57'
                  type='number'
                  value={address.number}
                  onChange={e => handleChange('number', e)}
                  isInvalid={!!error.number}
                  errorMessage={error.number}
                />
                <div className='flex gap-2'>
                  <Select
                    label='País'
                    placeholder='Selecciona tu país'
                    selectedKeys={['Colombia']}
                    onChange={e => handleChange('country', e)}
                    isInvalid={!!error.country}
                    errorMessage={error.country}
                  >
                    <SelectItem key='Colombia' value='Colombia'>
                      Colombia
                    </SelectItem>
                  </Select>
                  <Select
                    label='Ciudad'
                    placeholder='Selecciona tu ciudad'
                    selectedKeys={['Bogotá']}
                    onChange={e => handleChange('city', e)}
                    isInvalid={!!error.city}
                    errorMessage={error.city}
                  >
                    <SelectItem key='Bogotá' value='Bogotá'>
                      Bogotá
                    </SelectItem>
                  </Select>
                </div>
                <Select
                  label='Localidad'
                  placeholder='Selecciona tu Localidad'
                  selectedKeys={address.localidad ? [`${address.localidad}`] : []}
                  onChange={e => handleChange('localidad', e)}
                  isInvalid={!!error.localidad}
                  errorMessage={error.localidad}
                >
                  {
                    localidades.map(localidad => (
                      <SelectItem key={localidad} value={localidad}>
                        {localidad}
                      </SelectItem>
                    ))
                  }
                </Select>
                <div className='flex gap-2'>
                  <Select
                    label='Tipo de calle'
                    placeholder='Selecciona tu calle'
                    defaultSelectedKeys={[`${address.address.streetType}`]}
                    onChange={e => handleChange('address.streetType', e)}
                    isInvalid={!!error.address.streetType}
                    errorMessage={error.address.streetType}
                  >
                    {
                      streetTypes.map(localidad => (
                        <SelectItem key={localidad} value={localidad}>
                          {localidad}
                        </SelectItem>
                      ))
                    }
                  </Select>
                  <Input
                    label={address.address.streetType}
                    value={address.address.value1}
                    onChange={e => handleChange('address.value1', e)}
                    isInvalid={!!error.address.value1}
                    errorMessage={error.address.value1}
                  />
                </div>
                <div className='flex gap-2'>
                  <Input
                    label='Número'
                    startContent='#'
                    value={address.address.value2}
                    onChange={e => handleChange('address.value2', e)}
                    isInvalid={!!error.address.value2}
                    errorMessage={error.address.value2}
                  />
                  <Input
                    label='Guion'
                    startContent='-'
                    value={address.address.value3}
                    onChange={e => handleChange('address.value3', e)}
                    isInvalid={!!error.address.value3}
                    errorMessage={error.address.value3}
                  />
                </div>
                <Input
                  label='Referencias adicionales de esta dirección'
                  value={address.aditionalInfo}
                  onChange={e => handleChange('aditionalInfo', e)}
                  isInvalid={!!error.aditionalInfo}
                  errorMessage={error.aditionalInfo}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={() => handleSubmit(onClose)}>
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
