'use client'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type IInfluencer = {
  id: number
  qualification: number
  full_name: string
  document_number: string
  gender: string
  preview: string
  bank: string
  path: string
}

export function Banner ({ influencer }: { influencer: IInfluencer }) {
  const [follow, setFollow] = useState<boolean>(false)

  return (
    <div className='w-full flex justify-center'>
      <div className='w-[1000px] [@media(max-width:800px)]:w-full my-5 [@media(max-width:800px)]:m-0'>
        <Image src={influencer.preview} width='400' height='200' alt='banner image' className='w-full h-[300px] bg-black rounded-lg' />
        <Link href='/' className='bg-white fixed top-5 [@media(max-width:800px)]:top-12 m-4 rounded-3xl'><Image src='./icons/arrow-left-circle-fill.svg' width='35' height='35' alt='image' /></Link>
        <div className='flex items-center mt-5 w-full justify-center gap-16'>
          <p className='font-semibold m-3'>{influencer?.full_name}</p>
          <Button className='transition-all' color={follow ? 'secondary' : 'primary'} onPress={() => setFollow(!follow)}>{follow ? 'Following' : 'Follow'}</Button>
        </div>
        <div className='w-full flex mt-10 justify-center items-center px-10'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam provident recusandae dolore! Quo culpa nam deserunt obcaecati magnam, placeat suscipit delectus facilis sapiente. Similique, neque ducimus iure debitis voluptatum obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates mollitia, officia non corrupti quidem maiores maxime suscipit delectus omnis perferendis repellat perspiciatis officiis minus dolorum magnam repellendus laborum alias tenetur.</p>
        </div>
      </div>
    </div>
  )
}
