'use client'
import { useSearchParams } from 'next/navigation'
import { SearchBarr } from '@/components'
import { useSupabase } from '../Providers'
import { useEffect, useState } from 'react'
import { Card, CardBody, Avatar, Button, Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

const serviceFee = 2000
const influencer = 2000

export default function SearchPage () {
  const { supabase } = useSupabase()
  const query: any = useSearchParams().get('q')?.split(' ').join(' or ')

  const [follow, setFollow] = useState<boolean>(false)
  const [influencers, setInfluencers] = useState<any>(null)
  const [products, setProducts] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, avatar, path, description')
      .textSearch('full_name', query, { type: 'websearch' })
      .then(res => setInfluencers(res.data))

    supabase
      .from('products')
      .select('id, category, name, price, preview, state, influencers( avatar, path, full_name )')
      .textSearch('name', query, { type: 'websearch' })
      .then(res => setProducts(res.data))
  }, [query])

  return (
    <main className='flex flex-col items-center'>
      <SearchBarr message={false} />
      <div className='flex flex-col gap-5 mb-10'>
        {influencers?.map((item: any) => (
          <Link href={item.path} key={item.id}>
            <Card>
              <CardBody className='p-2'>
                <div className='grid grid-cols-3 gap-4 items-center'>
                  <Image
                    alt='img'
                    src={item.avatar}
                    width='250'
                    height='250'
                    className='w-[150px] h-[150px] [@media(max-width:800px)]:h-[120px] rounded-full row-span-2'
                  />
                  <p>{item.full_name}</p>
                  <Link href='#' className='pt-4'>
                    <Button
                      color={follow ? 'primary' : 'secondary'}
                      onPress={() => setFollow(!follow)}
                    >
                      {follow ? 'dejar de seguir' : 'seguir'}
                    </Button>
                  </Link>
                  <p className='opacity-60 w-72 [@media(max-width:800px)]:w-60 h-14 text-small col-span-2 overflow-hidden'>
                    {item.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
      <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
        {products?.map((item: any) => (
          <Link href={`/checkout?q=${item.id}`} key={item.id}>
            <Card>
              <CardBody
                className='p-0'
              >
                <Image
                  src={item.preview}
                  width='200'
                  height='200'
                  alt='preview'
                  className='w-[350px] h-[200px]'
                />
                {!item?.state && (
                  <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
                    Agotado
                  </Chip>
                )}
                <div className='p-4 flex justify-between items-center'>
                  <div className='flex gap-3 items-center'>
                    <Link href={item.influencers.path}>
                      <Avatar src={item.influencers.avatar} />
                    </Link>
                    <div>
                      <p className='text-xl'>
                        {item.name}
                      </p>
                      <p className='opacity-60'>{item.influencers.full_name}</p>
                    </div>
                  </div>
                  <p className='font-bold text-green-600'>
                    ${(item.price + serviceFee + influencer).toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
