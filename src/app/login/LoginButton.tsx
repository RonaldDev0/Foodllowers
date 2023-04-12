import Image from 'next/image'

// Types
import { provider } from './providers'

export default function LoginButon ({ name, logo, login }: provider) {
  return (
    <div className='flex w-full justify-center'>
      <button className='w-72 flex items-center gap-4 h-16 bg-[#B3B3B3] text-xl rounded-xl p-2 [@media(min-width:800px)]:text-white [@media(min-width:800px)]:bg-[#2f2f2f]'>
        <Image src={logo} alt={name} width='50' height='50' />
        <p>Login with {name}</p>
      </button>
    </div>
  )
}
