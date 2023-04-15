import Image from 'next/image'

export default function Home () {
  return (
    <div className='flex w-full h-screen items-center justify-center bg-[#2f2f2f]'>
      <Image src='./foodllowers-logo.svg' alt='logo' width='1000' height='1000' priority />
    </div>
  )
}
