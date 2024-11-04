'use client'
import { Tabs, Tab } from '@nextui-org/react'
import { useUser } from '@/store'
import { Store } from 'lucide-react'

type IProps = {
  pickUpInStore: boolean
  setPickUpInStore: Function
}

export function DeliveryOption ({ pickUpInStore, setPickUpInStore }: IProps) {
  const { darkMode } = useUser()
  return (
    <Tabs
      className='w-full flex justify-center'
      selectedKey={pickUpInStore ? '2' : '1'}
      onSelectionChange={key => setPickUpInStore(key === '2')}
      color={darkMode ? 'secondary' : 'warning'}
      variant='bordered'
    >
      <Tab
        key='1'
        title={
          <div className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-motor-racing-helmet'
            >
              <path d='M22 12.2a10 10 0 1 0-19.4 3.2c.2.5.8 1.1 1.3 1.3l13.2 5.1c.5.2 1.2 0 1.6-.3l2.6-2.6c.4-.4.7-1.2.7-1.7Z' />
              <path d='m21.8 18-10.5-4a2 2.06 0 0 1 .7-4h9.8' />
            </svg>
            <span>Entrega a domicilio</span>
          </div>
        }
      />
      <Tab
        key='2'
        title={
          <div className='flex items-center gap-2'>
            <Store size={20} />
            <span>Recoger en la cocina</span>
          </div>
        }
      />
    </Tabs>
  )
}
