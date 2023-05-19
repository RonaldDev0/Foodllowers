'use client'
import { useState } from 'react'

import AddModal from './AddModal'
import ListCards from './ListCards'
import AddButton from './AddButton'

export default function PaymentMethods () {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='w-full h-screen flex flex-col top-12 justify-around items-center'>
      {open && <AddModal setOpen={setOpen} />}
      <ListCards />
      <AddButton setOpen={setOpen} />
    </div>
  )
}
