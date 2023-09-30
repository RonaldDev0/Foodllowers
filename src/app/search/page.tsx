'use client'
import { useSearchParams } from 'next/navigation'
import { SearchBarr } from '@/components'
import { useSupabase } from '../Providers'
import { useEffect, useState } from 'react'

export default function SearchPage () {
  const { supabase } = useSupabase()
  const query = useSearchParams().get('query')
  const [influencer, setInfluencer] = useState<any>(null)
  // const [products, setProducts] = useState<any>(null)

  const filter = [
    query,
    query?.toLocaleLowerCase(),
    query?.toLocaleUpperCase(),
    query?.replace(/\b\w/g, char => char.toUpperCase()),
    ...query?.split(' ') as any
  ]

  useEffect(() => {
    supabase
      .from('influencers')
      .select('id, full_name, qualification, preview, path')
      .in('full_name', filter)
      .then(({ data }) => setInfluencer(data))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className='h-screen flex flex-col items-center'>
      <SearchBarr message={false} />
      {influencer?.map((item: any) => <h2 key={item.id} className='my-10 text-purple-900 text-2xl'>{item.full_name}</h2>)}
      {filter.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  )
}
