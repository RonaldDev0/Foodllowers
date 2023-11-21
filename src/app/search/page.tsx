'use client'
import { useSearchParams } from 'next/navigation'
import { SearchBarr } from '@/components'
import { useSupabase } from '../Providers'
import { useEffect, useState } from 'react'
import { Card, CardBody, Avatar, Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchPage () {
  const { supabase } = useSupabase()
  const query: any = useSearchParams().get('q')?.split(' ').join(' or ')

  const [follow, setFollow] = useState<boolean>(false)
  const [influencers, setInfluencers] = useState<any>(null)
  const [products, setProducts] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, qualification, preview, path, description')
      .textSearch('full_name', query, { type: 'websearch' })
      .order('qualification', { ascending: false })
      .then(res => setInfluencers(res.data))

    supabase
      .from('products')
      .select('id, category, name, description, price, preview, influencers( preview, path, full_name )')
      .textSearch('name', query, { type: 'websearch' })
      .then(res => setProducts(res.data))
  }, [query])

  return (
    <main className='h-screen flex flex-col items-center'>
      <SearchBarr message={false} />
      <div className='flex flex-col gap-5'>
        {influencers?.map((item: any) => (
          <Link href={item.path} key={item.id}>
            <Card>
              <CardBody className='p-2'>
                <div className='grid grid-cols-3 gap-4 items-center'>
                  <Image
                    alt='img'
                    src={item.preview}
                    width='250'
                    height='250'
                    className='w-[150px] h-[150px] [@media(max-width:800px)]:h-[120px] rounded-full row-span-2'
                  />
                  <div className='pt-4 flex flex-col'>
                    <h2>{item.full_name}</h2>
                    <p>⭐{item.qualification}</p>
                  </div>
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
        {products?.map((item: any) => (
          <Link href={`/checkout?q=${item.id}`} key={item.id}>
            <Card>
              <CardBody className='p-0'>
                <div className='[@media(min-width:800px)]:flex'>
                  <Image
                    alt='img'
                    src={item.preview}
                    width='250'
                    height='250'
                    className='w-[300px] h-[200px] [@media(max-width:800px)]:w-full'
                  />
                  <div className='p-4 [@media(max-width:800px)]:flex [@media(max-width:800px)]:justify-between'>
                    <div>
                      <h2>
                        {item.name}
                      </h2>
                      <p className='opacity-60'>
                        {item.description}
                      </p>
                      <p className='font-bold text-green-600'>
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <Link href={item.influencers.path} className='flex items-center'>
                      <Avatar className='mt-5' src={item.influencers.preview} />
                      <p className='opacity-60 mt-5 ml-2 hover:opacity-100 transition-all'>{item.influencers.full_name}</p>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
