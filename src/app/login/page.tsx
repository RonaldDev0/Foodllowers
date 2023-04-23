// Components
import Image from 'next/image'
import LoginButton from './LoginButton'

// Data
import { provider, providers } from './providers'

export default function Login () {
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center [@media(min-width:800px)]:-translate-y-20'>
      <Image src='./foodllowers-logo.svg' width='420' height='315' alt='logo' priority className='rounded-2xl bg-white [@media(min-width:800px)]:translate-y-40' />
      <div className='h-96 flex flex-col justify-around mb-28 mt-14 [@media(min-width:800px)]:bg-[#8D8D8D] [@media(min-width:800px)]:m-0 [@media(min-width:800px)]:w-[650px] [@media(min-width:800px)]:h-[650px] [@media(min-width:800px)]:pt-56 [@media(min-width:800px)]:rounded-xl [@media(min-width:800px)]:justify-normal [@media(min-width:800px)]:gap-10'>
        {
          providers.map(({ name, logo, provider }: provider) => <LoginButton key={name} name={name} logo={logo} provider={provider} />)
        }
      </div>
    </div>
  )
}
