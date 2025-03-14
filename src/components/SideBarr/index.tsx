'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Profile from './Profile'
import Pages from './Pages'
import Logout from './Logout'
import { useUser, useContent } from '@/store'
import { Card, CardBody, Switch } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

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

export function SideBarr () {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('sidebarOpen') || 'true'))
  const [isMobile, setIsMobile] = useState(true)
  const { user, darkMode, setStore } = useUser()
  const { currentProduct } = useContent()

  const [color, setcolor] = useState('transparent')

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(open))
  }, [open])

  useEffect(() => {
    !darkMode
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark')

    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    setIsMobile(/mobile/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!open) return setcolor('transparent')
    setTimeout(() => setcolor('rgba(0, 0, 0, 0.5)'), 430)
  }, [open])

  if (!user || pathname === '/error') return null

  return (
    <>
      {
        (isMobile && pathname === '/checkout')
          ? (
            <div className='mt-3 fixed left-0 z-40 w-full flex justify-center items-center'>
              <Card className='w-96'>
                <CardBody onClick={() => setOpen(!open)}>
                  <div className='flex justify-between items-center'>
                    <Menu size={40} className='cursor-pointer' />
                    <p>{currentProduct?.name}</p>
                    <div className='w-10' />
                  </div>
                </CardBody>
              </Card>
            </div>
            )
          : (
            <Card className='m-3 fixed left-0 z-40'>
              <CardBody className='p-1'>
                <Menu
                  size={40}
                  className='cursor-pointer'
                  onClick={() => setOpen(!open)}
                />
              </CardBody>
            </Card>
            )
      }
      <motion.div
        className={`fixed z-50 top-0 left-0 h-screen rounded-none rounded-r-lg flex ${isMobile ? 'w-[100vw]' : 'w-[300px]'}`}
        variants={{ open: { x: 0 }, closed: { x: '-100%' } }}
        initial='closed'
        animate={open ? 'open' : 'closed'}
        transition={{ duration: isMobile ? 0.5 : 0.7 }}
      >
        <Card className='w-[300px] top-0 left-0 h-screen rounded-none rounded-r-lg'>
          <CardBody className='p-0'>
            <div className='w-full flex justify-around mt-3'>
              <Switch
                onClick={() => setStore('darkMode', !darkMode)}
                defaultSelected={!darkMode}
                size='md'
                color='warning'
                thumbIcon={({ isSelected, className }: any) => (
                  isSelected
                    ? <SunIcon className={className} />
                    : <MoonIcon className={className} />
                )}
              />
              <X
                size={40}
                className='cursor-pointer'
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className='h-full w-full flex flex-col justify-around items-center'>
              <Profile user={user} />
              <Pages isMobile={isMobile} setOpen={setOpen} />
              <Logout />
            </div>
          </CardBody>
        </Card>
        {isMobile && (
          <div
            className={`w-[130px] ${open && `transition-all bg-[${color}]`}`}
            style={{ backgroundColor: color }}
            onClick={() => setOpen(false)}
          />
        )}
      </motion.div>
    </>
  )
}
