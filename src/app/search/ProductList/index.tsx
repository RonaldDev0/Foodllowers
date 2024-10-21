'use client'
import { useSupabase } from '@/app/Providers'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from './ProductCard'
import { useContent } from '@/store'

function calculateMercadoPagoComission (amount: number) {
  const porcentajeComision = 0.0279
  const IVA = 0.19
  const costoFijo = 952

  const comision = amount * porcentajeComision
  const IVAComision = comision * IVA
  const totalComision = comision + IVAComision + costoFijo

  return Math.floor(totalComision + 101)
}

export function ProductList () {
  const { supabase } = useSupabase()
  const query: any = useSearchParams().get('q')?.split(' ').join(' or ')
  const { influencer, serviceFee } = useContent()

  const [products, setProducts] = useState<any>(null)

  useEffect(() => {
    if (influencer === 0 || serviceFee === 0) return
    supabase
      .from('products')
      .select('id, category, name, price, preview, state, influencers( avatar, full_name ), kitchens( open, address, bank_account )')
      .textSearch('name', query, { type: 'websearch' })
      .then(({ data, error }) => {
        if (error) return

        const products = data
          .filter((item: any) => item.influencers !== null)
          .filter((item: any) =>
            item.kitchens.address !== null &&
            item.kitchens.bank_account !== null &&
            item.influencers.bank_account !== null
          )

        const updatePrices = products.map((item: any) => ({
          ...item,
          price: item.price + influencer + serviceFee + calculateMercadoPagoComission(item.price + influencer + serviceFee)
        }))

        setProducts(updatePrices)
      })
  }, [query, influencer, serviceFee])

  return (
    <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
      {products?.map((item: any) => (
        <ProductCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}
