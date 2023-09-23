'use client'
import { useUserPayment } from '@/store'
import { useSupabase } from '../supabaseProvider'
import { useState } from 'react'
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'

import { AddressEdit } from './AddressEdit'

export function CardAddress ({ item }: any) {
  const { filter, addressList } = useUserPayment()
  const { supabase } = useSupabase()
  const [editModal, setEditModal] = useState<boolean>(false)
  const { id, value: { name, phone, address: { line1, city } } } = item

  const remove = () => supabase.from('adresses').delete().eq('id', id).then(({ error }) => error === null && filter('addressList', addressList.filter((item: any) => item.id !== id)))

  return (
    <>
      <Card>
        <CardBody>
          <div className='rounded-lg w-72 flex flex-col gap-5'>
            <div className='flex w-full justify-between'>
              <p className='font-bold'>{name}</p>
              <p>{phone.slice(3)}</p>
            </div>
            <div className='flex w-full gap-2 justify-between'>
              <div>
                <p>{city}</p>
                <p>{line1}</p>
              </div>
              <Dropdown>
                <DropdownTrigger><Button color='secondary'>Opciones</Button></DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='edit' onClick={() => setEditModal(true)}>Editar direccion</DropdownItem>
                  <DropdownItem key='delete' onClick={remove} className='text-danger' color='danger'>Borrar direccion</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>
      {editModal && <AddressEdit setEditModal={setEditModal} item={item} />}
    </>
  )
}
