import Image from 'next/image'
import { LoginButton } from './LoginButton'
import { Carousel } from './Carousel'

function Left () {
  return (
    <div
      className='[@media(max-width:800px)]:w-[100vw] w-[50vw] flex flex-col [@media(max-width:800px)]:justify-start justify-center items-center bg-[#F87979]'
    >
      <Image
        src='./foodllowers-logo.svg'
        width='350' height='350'
        alt='logo'
        priority
        className='[@media(max-width:800px)]:w-[300px]'
      />
      <div className='[@media(max-width:800px)]:hidden'>
        <p className='font-bold text-4xl w-[400px]'>¡Registrate hoy y recibe hasta 15 dias</p>
        <p className='font-bold text-2xl'>de Envios Gratis pagando con tarjeta!</p>
      </div>
    </div>
  )
}

function Right () {
  return (
    <div className='[@media(max-width:800px)]:fixed [@media(max-width:800px)]:top-56 [@media(max-width:800px)]:w-[100vw] w-[50vw] flex flex-col items-center [@media(max-width:800px)]:gap-12 gap-44 mt-28'>
      <h2 className='[@media(max-width:800px)]:text-white text-black font-bold text-4xl w-96 text-center'>Registrate o ingresa para continuar</h2>
      <LoginButton />
      <Carousel />
    </div>
  )
}

export default function Login () {
  return (
    <main className='flex h-[100vh] bg-[#F4F4F4]'>
      <Left />
      <Right />
    </main>
  )
}
