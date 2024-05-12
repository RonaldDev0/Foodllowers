'use client'
import { ProductCard, IProductCard } from './ProductCard'
import { useContent } from '@/store'

export function ProductList () {
  const { currentInfluencer } = useContent()
  return (
    <div className='flex w-full justify-center flex-wrap gap-5 mb-10 max-w-7xl'>
      {currentInfluencer.products?.map((product: IProductCard) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}
