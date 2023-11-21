'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar } from '@nextui-org/react'
import { SearchBarr } from '@/components'
import { useSupabase } from './Providers'
import { useContent } from '@/store'

export default function Home () {
  const router = useRouter()
  const loginCode = useSearchParams().get('code')
  const { supabase } = useSupabase()
  const { influencerList, productList, setStore } = useContent()

  useEffect(() => {
    loginCode && setTimeout(() => router.push('/'), 200)

    !influencerList && (
      supabase
        .from('influencers')
        .select('id, full_name, qualification, preview, path')
        .range(0, 10)
        .then(res => setStore('influencerList', res.data))
    )

    !productList && (
      supabase
        .from('products')
        .select('id, preview, name, price, influencers( preview, full_name, path )')
        .range(0, 10)
        .then(res => setStore('productList', res.data))
    )
  }, [])

  return (
    <div className='flex flex-col w-full mb-16 items-center gap-12'>
      <SearchBarr message />
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          influencerList?.map(item => (
            <Link href={item.path} key={item.id}>
              <Avatar size='lg' className='w-20 h-20' src={item.preview} />
            </Link>
          ))
        }
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          productList?.map((product: any) => (
            <Link href={`/checkout?q=${product.id}`} key={product.id}>
              <Card>
                <CardBody className='p-0'>
                  <Image
                    src={product.preview}
                    width='200'
                    height='200'
                    alt='preview'
                    className='w-[350px] h-[200px]'
                  />
                  <div className='p-4 flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                      <Link href={product.influencers.path}>
                        <Avatar src={product.influencers.preview} />
                      </Link>
                      <div>
                        <p className='text-xl'>
                          {product.name}
                        </p>
                        <p className='opacity-60'>{product.influencers.full_name}</p>
                      </div>
                    </div>
                    <p className='font-bold text-green-600'>
                      ${product.price.toLocaleString()}
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
