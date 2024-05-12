'use client'
import { useUser, type IAddress } from '@/store'
import { useSupabase } from '@/app/Providers'
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, useDisclosure, DropdownItem } from '@nextui-org/react'
import { AddressForm } from '../AddressForm'
import { Settings } from 'lucide-react'

export function CardAddress ({ address }: { address: IAddress }) {
  const { setStore, addressList } = useUser()
  const { supabase } = useSupabase()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const remove = () => {
    supabase
      .from('addresses')
      .delete()
      .eq('id', address.id)
      .then(({ error }) => {
        if (error) {
          return
        }
        const newAddressList = addressList?.filter(item => item.id !== address.id)
        setStore('addressList', newAddressList)
      })
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
                    <Settings size={20} />
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
