import Image from 'next/image'

export default async function Home () {
  const logo = './foodllowers-logo.svg'

  return (
    <div className='flex w-full h-screen items-center justify-center bg-[#2f2f2f]'>
      <Image src={logo} alt='logo' width='1000' height='1000' priority />
    </div>
  )
}
