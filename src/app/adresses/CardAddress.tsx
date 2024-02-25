'use client'
import { useUser } from '@/store'
import { useSupabase } from '../Providers'
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, useDisclosure, DropdownItem } from '@nextui-org/react'
import { AddressForm } from './AddressForm'
import type { IAddress } from './page'

export function CardAddress ({ address }: { address: IAddress }) {
  const { setStore, addressList } = useUser()
  const { supabase } = useSupabase()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const remove = () => {
    supabase
      .from('addresses')
      .delete()
      .eq('id', address.id)
      .then(({ error }) => !error && (
        setStore('addressList',
          addressList
            ?.filter((item: any) => item.id !== address.id)
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
                {address.user}
              </p>
              <p>
                {address.numberPrefix + ' ' + address.number}
              </p>
            </div>
            <div className='flex w-full gap-2 justify-between'>
              <div>
                <p>
                  {address.formatted_address}
                </p>
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
        value={address}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
