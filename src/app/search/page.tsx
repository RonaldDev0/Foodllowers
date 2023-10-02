'use client'
import { useSearchParams } from 'next/navigation'
import { SearchBarr } from '@/components'
import { Influencers } from './Influencers'

export default function SearchPage () {
  const query: any = useSearchParams().get('query')?.split(' ').join(' or ')

  return (
    <div className='h-screen flex flex-col items-center'>
      <SearchBarr message={false} />
      <Influencers query={query} />
    </div>
  )
}
