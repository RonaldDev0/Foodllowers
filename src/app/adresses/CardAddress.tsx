'use client'
import { useUser } from '@/store'
import { useSupabase } from '../Providers'
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, useDisclosure, DropdownItem } from '@nextui-org/react'
import { AddressForm } from './AddressForm'

export function CardAddress ({ item }: any) {
  const { setStore, addressList } = useUser()
  const { supabase } = useSupabase()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { id, value: { name, phone, address: { line1, city } } } = item

  const remove = () => {
    supabase
      .from('adresses')
      .delete()
      .eq('id', id)
      .then(({ error }) => !error && (
        setStore('addressList',
          addressList
            ?.filter((item: any) => item.id !== id)
        )
      ))
  }

  return (
    <>
      <Card>
        <CardBody>
          <div className='rounded-lg w-72 flex flex-col gap-5'>
            <div className='flex w-full justify-between'>
              <p className='font-bold'>
                {name}
              </p>
              <p>{phone.slice(3)}</p>
            </div>
            <div className='flex w-full gap-2 justify-between'>
              <div>
                <p>{city}</p>
                <p>{line1}</p>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button color='secondary'>
                    Opciones
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='edit' onPress={onOpen}>
                    Editar dirección
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    onClick={remove}
                    className='text-danger'
                    color='danger'
                  >
                    Borrar direccion
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>
      <AddressForm
        HeadLabel='Editar dirección de envio'
        isEdit
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
