import Image from 'next/image'

// Types
type props = {
  user: {
    avatar_url: string,
    full_name: string
  }
}

export default function Profile ({ user }: props) {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <Image src={user?.avatar_url} alt='avatar' width={200} height={200} className='rounded-full h-[200px]' priority />
      <span className='text-xl'>{user?.full_name}</span>
    </div>
  )
}
