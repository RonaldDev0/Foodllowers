import Image from 'next/image'

export type IProductCard = {
  id: number
  id_influencer: number
  id_kitchen: number
  category: string
  price: number
  preview: string
  name: string
  description: string
}

export function ProductCard ({ product }: { product: IProductCard}) {
  const { price, name, description } = product

  return (
    <div className='bg-bg_card rounded-lg p-3 hover:bg-bg_card_hover transition-all cursor-pointer'>
      <Image src='./img/pato404.svg' width='200' height='200' alt='preview' />
      <p className='text-xl'>{name}</p>
      <p className='text-dark_gray'>{description}</p>
      <p className='font-bold'>${price}</p>
    </div>
  )
}
