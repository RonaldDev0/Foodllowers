'use client'
import { useSearchParams } from 'next/navigation'
import { SearchBarr } from '@/components'

export default function SearchPage () {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  // TODO: supabase get products/influencers with query filter

  return (
    <div className='h-screen flex flex-col items-center'>
      <SearchBarr message={false} />
      <p>{query}</p>
    </div>
  )
}
