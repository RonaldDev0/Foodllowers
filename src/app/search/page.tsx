'use client'
import { useSearchParams } from 'next/navigation'
import { SearchBarr } from '@/components'
import { useSupabase } from '../Providers'
import { useEffect, useState } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchPage () {
  const { supabase } = useSupabase()
  const query: any = useSearchParams().get('q')?.split(' ').join(' or ')

  const [influencers, setInfluencers] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, qualification, preview, path')
      .textSearch('full_name', query, { type: 'websearch' })
      .order('qualification', { ascending: false })
      .then(res => setInfluencers(res.data))
  }, [query])

  return (
    <div className='h-screen flex flex-col items-center'>
      <SearchBarr message={false} />
      <div className='flex flex-col gap-10'>
        {influencers?.map((item: any) => (
          <Link href={item.path} key={item.id}>
            <Card>
              <CardBody className='p-0 w-96'>
                <div className='flex'>
                  <Image
                    alt='img'
                    src={item.preview}
                    width='250'
                    height='250'
                  />
                  <div className='p-4'>
                    <h2>
                      {item.full_name}
                    </h2>
                    <p>
                      ⭐{item.qualification}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
