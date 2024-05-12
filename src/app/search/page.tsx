import { SearchBarr } from '@/components'
import { InfluencerList } from './InfluencerList'
import { ProductList } from './ProductList'

export default function SearchPage () {
  return (
    <main className='flex flex-col items-center'>
      <SearchBarr message={false} />
      <InfluencerList />
      <ProductList />
    </main>
  )
}
