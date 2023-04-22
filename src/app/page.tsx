import Link from 'next/link'

export default function Home () {
  return (
    <div className='flex w-full h-screen items-center justify-center bg-[#2f2f2f] gap-12'>
      <Link href='/profile'>Profile</Link>
    </div>
  )
}
