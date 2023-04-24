'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Components
import Profile from './Profile'
import Pages from './Pages'
import Logout from './Logout'
import { useSupabase } from '@/app/supabaseProvider'

// Types
type propsClose = {
  open: boolean,
  setOpen: Function
}

type props = {
  open: boolean,
  setOpen: Function,
  user: {
    avatar_url: string,
    full_name: string
  },
  setUser: Function
}

export function SideBarrClose ({ open, setOpen }: propsClose) {
  return (
    <Image className='m-3 cursor-pointer fixed' onClick={() => setOpen(!open)} src='./icons/menu.svg' alt='menu-icon' width='50' height='50' priority />
  )
}

export function SideBarrOpen ({ open, setOpen, user, setUser }: props) {
  return (
    <div className='fixed w-[300px] bg-[#1f1f1f] top-0 left-0 h-screen'>
      <div className='w-full flex justify-end'>
        <Image className='m-3 cursor-pointer text-white' onClick={() => setOpen(!open)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
      </div>
      <div className='h-full w-full flex flex-col justify-around items-center'>
        <Profile user={user} />
        <Pages />
        <Logout setUser={setUser} />
      </div>
    </div>
  )
}

export function SideBarr () {
  const { supabase } = useSupabase()
  const [open, setOpen] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: { user: { user_metadata: user } } } }: any) => setUser(user))
  }, [])

  if (user === null) {
    return null
  }

  return open ? <SideBarrOpen open={open} setOpen={setOpen} user={user} setUser={setUser} /> : <SideBarrClose open={open} setOpen={setOpen} />
}
