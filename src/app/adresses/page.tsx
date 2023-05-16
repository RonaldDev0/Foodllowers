'use client'
import { useState } from 'react'

import AddModal from './AddModal'
import ListAdresses from './ListAdresses'
import AddButton from './AddButton'

export default function Adresses () {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='w-full h-screen flex flex-col justify-around items-center'>
      {open && <AddModal setOpen={setOpen} />}
      <ListAdresses setOpen={setOpen} />
      <AddButton setOpen={setOpen} />
    </div>
  )
}
