import Image from 'next/image'
import { IProductCard } from './ProductCard'

export function ProductModal ({ currentProduct, setCurrentProduct }: { currentProduct: IProductCard, setCurrentProduct: Function }) {
  const { name, description, price } = currentProduct

  return (
    <div className='flex items-center justify-center fixed z-0 w-full h-screen bg-black bg-opacity-30 left-0 top-0'>
      <div className='[@media(max-width:400px)]:w-full w-96 bg-bg_card rounded-lg'>
        <div className='w-full flex justify-end'>
          <Image className='m-3 cursor-pointer text-white' onClick={() => setCurrentProduct(undefined)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
        </div>
        <div className='flex flex-col w-full items-center'>
          <Image src='./img/pato404.svg' width='200' height='200' alt='preview' />
        </div>
        <div className='m-5'>
          <p>{name}</p>
          <p className='text-dark_gray'>{description}</p>
          <p className='text-green-600'>${price}</p>
        </div>
        <div className='flex w-full justify-center'>
          <button className='bg-green-600 mb-5 px-2 py-1 rounded-lg text-2xl'>Buy</button>
        </div>
      </div>
    </div>
  )
}
