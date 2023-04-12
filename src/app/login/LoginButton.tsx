import Image from 'next/image'

// Types
import { provider } from './providers'

export default function LoginButon ({ name, logo, login }: provider) {
  return (
    <div className='flex w-full justify-center'>
      <button className='w-72 flex items-center gap-4 bg-[#B3B3B3] text-xl rounded-xl p-2'>
        <Image src={logo} alt={name} width='50' height='50' />
        <p>Login with {name}</p>
      </button>
    </div>
  )
}
