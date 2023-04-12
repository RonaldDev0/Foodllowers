
// Components
import Image from 'next/image'
import LoginButton from './LoginButton'

// Data
import { provider, providers } from './providers'

export default function Login () {
  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <div className='rounded-2xl'>
        <Image src='./foodllowers-logo.svg' width='420' height='420' alt='logo' priority className='rounded-2xl bg-white' />
        <div className='h-96 flex flex-col justify-around mb-28 mt-14'>
          {
            providers?.map(({ name, logo, login }: provider) => <LoginButton key={name} name={name} logo={logo} login={login} />)
          }
        </div>
      </div>
    </div>
  )
}
