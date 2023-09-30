'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Components
import Profile from './Profile'
import Pages from './Pages'
import Logout from './Logout'
import { useUser } from '@/context'
import { Card, CardBody, Switch } from '@nextui-org/react'

// Types
type propsClose = {
  open: boolean,
  setOpen: Function
}

type props = {
  open: boolean,
  setOpen: Function,
}

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' }
}

const MoonIcon = (props: any) => (
  <svg aria-hidden='true' focusable='false' height='1em' role='presentation' viewBox='0 0 24 24' width='1em' {...props}>
    <path d='M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z' fill='currentColor' />
  </svg>
)

const SunIcon = (props: any) => (
  <svg aria-hidden='true' focusable='false' height='1em' role='presentation' viewBox='0 0 24 24' width='1em' {...props}>
    <g fill='currentColor'>
      <path d='M19 12a7 7 0 11-7-7 7 7 0 017 7z' />
      <path d='M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z' />
    </g>
  </svg>
)

export function SideBarrClose ({ open, setOpen }: propsClose) {
  return <Image className='m-3 cursor-pointer fixed left-0 z-10' onClick={() => setOpen(!open)} src='./icons/menu.svg' alt='menu-icon' width='50' height='50' priority />
}

export function SideBarrOpen ({ open, setOpen }: props) {
  const { user } = useUser()
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => !darkMode ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark'), [darkMode])

  return (
    <motion.div
      className='fixed z-50 w-[300px] top-0 left-0 h-screen rounded-none rounded-r-lg'
      variants={sidebarVariants}
      initial='closed'
      animate={open ? 'open' : 'closed'}
      transition={{ duration: 0.5 }}
    >
      <Card className='w-[300px] top-0 left-0 h-screen rounded-none rounded-r-lg'>
        <CardBody className='p-0'>
          <div className='w-full flex justify-around'>
            <Switch
              onClick={() => setDarkMode(!darkMode)}
              defaultSelected={!darkMode}
              size='md'
              color='secondary'
              thumbIcon={({ isSelected, className }: any) => isSelected ? <SunIcon className={className} /> : <MoonIcon className={className} />}
            />
            <Image className='m-3 cursor-pointer' onClick={() => setOpen(!open)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
          </div>
          <div className='h-full w-full flex flex-col justify-around items-center'>
            <Profile user={user} />
            <Pages />
            <Logout />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

export function SideBarr () {
  const [open, setOpen] = useState<boolean>(true)
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <>
      <SideBarrClose open={open} setOpen={setOpen} />
      <SideBarrOpen open={open} setOpen={setOpen} />
    </>
  )
}
