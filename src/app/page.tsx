'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody } from '@nextui-org/react'
import { SearchBarr } from '@/components'
import { useSupabase } from './Providers'
import { useContent } from '@/store'

export default function Home () {
  const router = useRouter()
  const loginCode = useSearchParams().get('code')
  const { supabase } = useSupabase()
  const { influencerList, setStore } = useContent()

  useEffect(() => {
    loginCode && setTimeout(() => router.push('/'), 200)

    !influencerList && (
      supabase
        .from('influencers')
        .select('id, full_name, qualification, preview, path')
        .range(0, 10)
        .then(res => setStore('influencerList', res.data))
    )
  }, [])

  return (
    <div className='flex flex-col w-full mb-16 items-center gap-12'>
      <SearchBarr message />
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          influencerList?.map(item => (
            <Link href={item.path} key={item.id}>
              <Card>
                <CardBody className='p-0'>
                  <Image
                    src={item.preview}
                    width='350'
                    height='200'
                    alt='img preview'
                    className='w-[350px] h-[200px]'
                  />
                  <div className='px-4 pb-2 pt-2 flex justify-between'>
                    <p className='text-xl'>
                      {item.full_name}
                    </p>
                    <p>
                      ⭐{item.qualification}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
