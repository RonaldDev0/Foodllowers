/* eslint-disable camelcase */
// 'use client'
import { Divider } from '@nextui-org/react'
// import { useState } from 'react'
import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'
import { useContent } from '@/store'

export function Banner () {
  const { currentInfluencer: { banner, avatar, full_name } } = useContent()
  // const [follow, setFollow] = useState<boolean>(false)

  return (
    <div className='w-[1000px] [@media(max-width:800px)]:w-full mt-5 [@media(max-width:800px)]:m-0'>
      <Image
        src={banner}
        width='400'
        height='200'
        alt='banner image'
        className='w-full h-[200px] bg-black rounded-lg border border-white border-opacity-10'
      />
      {/* <Link
        href='/'
        className='bg-white absolute top-5 [@media(max-width:800px)]:top-12 m-4 rounded-3xl'
      >
        <ArrowLeft size={38} color='#595959' />
      </Link> */}
      <div className='flex gap-6 items-center mt-5 ml-4'>
        <Image
          alt='img'
          src={avatar}
          width='250'
          height='250'
          className='w-44 [@media(max-width:800px)]:w-32 rounded-full row-span-2 border border-white border-opacity-10'
        />
        <div className='flex flex-col gap-8'>
          <p className='font-bold text-xl'>{full_name}</p>
          {/* <Button
            color={follow ? 'primary' : 'secondary'}
            onPress={() => setFollow(!follow)}
          >
            {follow ? 'dejar de seguir' : 'seguir'}
          </Button> */}
        </div>
      </div>
      <Divider className='my-5' />
    </div>
  )
}
