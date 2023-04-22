'use client'

import { useState } from 'react'
import Image from 'next/image'

// Components
import Profile from './Profile'
import Pages from './Pages'
import Logout from './Logout'

// Types
type props = {
  open: boolean,
  setOpen: Function
}

export function SideBarrClose ({ open, setOpen }: props) {
  return (
    <Image className='m-3 cursor-pointer fixed' onClick={() => setOpen(!open)} src='./icons/menu.svg' alt='menu-icon' width='50' height='50' priority />
  )
}

export function SideBarrOpen ({ open, setOpen }: props) {
  return (
    <div className='fixed w-[300px] bg-[#1f1f1f] top-0 left-0 h-screen'>
      <div className='w-full flex justify-end'>
        <Image className='m-3 cursor-pointer text-white' onClick={() => setOpen(!open)} src='./icons/x.svg' alt='close-icon' width='40' height='40' />
      </div>
      <div className='h-full w-full flex flex-col justify-around items-center'>
        <Profile />
        <Pages />
        <Logout />
      </div>
    </div>
  )
}

export function SideBarr () {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <>
      {
        open ? <SideBarrOpen open={open} setOpen={setOpen} /> : <SideBarrClose open={open} setOpen={setOpen} />
      }
    </>
  )
}
