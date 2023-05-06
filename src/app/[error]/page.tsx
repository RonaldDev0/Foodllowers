import Link from 'next/link'
import Image from 'next/image'

export default function NotFound () {
  return (
    <div className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
      <h1 className='text-4xl'>404</h1>
      <Image src='img/pato404.svg' alt='404 error' width='400' height='400' />
      <h2 className='text-2xl'>Page not found</h2>
      <Link className='text-xl text-green-600' href='/'>Back to Home</Link>
    </div>
  )
}
