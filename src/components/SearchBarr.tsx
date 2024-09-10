'use client'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button, Card, CardBody } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Skranji } from 'next/font/google'

const skranji = Skranji({ weight: '400', subsets: ['latin'], display: 'swap', preload: true })

export function SearchBarr ({ message }: { message: boolean }) {
  const router = useRouter()
  const [input, setInput] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!input.trim()) return

    router.push(`/search?q=${input}`)
  }

  return (
    <div className={`flex flex-col items-center
      ${message ? 'mt-24' : 'my-10 [@media(max-width:800px)]:mt-16'}`}
    >
      <Image
        src='/img/LogName.png'
        alt='Google'
        width='450'
        height='450'
      />
      {message && (
        <p className={`${skranji.className} m-2 text-[1.5rem] text-[#f4ca44] font-bold`}>
          El dia esta muy lindo pa' no comer algo rico :3
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <Card className='[@media(max-width:800px)]:w-96'>
          <CardBody className='p-0'>
            <div className='flex items-center'>
              <input
                onChange={({ target: { value } }: any) => setInput(value)}
                value={input}
                className='bg-transparent outline-none p-3 w-[500px] [@media(min-width:800px)]:focus:w-[600px] transition-all rounded-l-lg'
                placeholder='Busca a tu favorito 😋...'
                type='text'
              />
              <Button
                style={{ backgroundColor: 'rgb(244, 202, 68)' }}
                size='lg'
                className='[@media(max-width:800px)]:hidden rounded-none rounded-r-lg'
              >
                <Search size={38} />
              </Button>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  )
}
