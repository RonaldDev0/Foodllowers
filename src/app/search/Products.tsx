'use client'
import { useSupabase } from '../Providers'
import { useEffect, useState } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export function Products ({ query }: { query: string }) {
  const { supabase } = useSupabase()
  const [influencers, setInfluencers] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('products')
      .select('id, , preview, path')
      .textSearch('full_name', query, { type: 'websearch' })
      .order('qualification', { ascending: false })
      .then(res => setInfluencers(res.data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className='flex flex-col gap-10'>
      {influencers?.map((item: any) => (
        <Link href={item.path} key={item.id}>
          <Card>
            <CardBody className='p-0 w-96'>
              <p>{}</p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  )
}
