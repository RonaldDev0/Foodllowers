'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Button, Card, CardBody } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function SearchBarr ({ message }: { message: boolean }) {
  const router = useRouter()
  const [input, setInput] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    router.push(`/search?q=${input}`)
  }

  return (
    <div className={`${message ? 'mt-24' : 'my-10 [@media(max-width:800px)]:mt-16'} flex flex-col items-center`}>
      {message && <p className='text-xl m-2'>¿Cuál es tu influenciador favorito?</p>}
      <form onSubmit={handleSubmit}>
        <Card className='[@media(max-width:800px)]:w-96'>
          <CardBody className='p-0'>
            <div className='flex items-center'>
              <input onChange={({ target: { value } }: any) => setInput(value)} value={input} className='bg-transparent outline-none p-3 w-[500px] [@media(min-width:800px)]:focus:w-[600px] transition-all rounded-l-lg' placeholder='Buscar...' type='text' />
              <Button color='primary' size='lg' className='[@media(max-width:800px)]:hidden rounded-none rounded-r-lg'>
                <Image src='./icons/search.svg' width='30' height='30' alt='search.svg' />
              </Button>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  )
}
