'use client'
import { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { Download } from 'lucide-react'

export const revalidate = 7 * 24 * 60 * 60

export default function Install () {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleUserGesture = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()

      deferredPrompt.userChoice.then(() => setDeferredPrompt(null))
    }
  }

  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <Image
        src='/img/LogName-light.png'
        alt='Foodllowers'
        width='450'
        height='450'
        className='fixed dark:hidden
        [@media(max-width:800px)]:top-32
        [@media(max-width:1400px)]:top-28
        [@media(min-width:1500px)]:top-60'
      />
      <Image
        src='/img/LogName.png'
        alt='Foodllowers'
        width='450'
        height='450'
        className='fixed hidden dark:block
        [@media(max-width:800px)]:top-32
        [@media(max-width:1400px)]:top-28
        [@media(min-width:1500px)]:top-60'
      />
      <Card className='w-96 [@media(max-width:365px)]:!w-80 border border-white border-opacity-10'>
        <CardHeader className='flex justify-center text-2xl gap-2'>
          <Download size={30} />
          Instala la app
        </CardHeader>
        <CardBody>
          Instala nuestra aplicación para disfrutar de una experiencia más rápida, acceso directo desde tu pantalla de inicio y funcionalidades exclusivas sin necesidad de abrir el navegador.
        </CardBody>
        <CardFooter>
          {deferredPrompt
            ? (
              <Button
                color='secondary'
                className='cursor-pointer w-full text-lg font-semibold'
                onClick={handleUserGesture}
              >
                Instalar
              </Button>
              )
            : (
              <p>No hay instalación disponible</p>
              )}
        </CardFooter>
      </Card>
    </main>
  )
}
