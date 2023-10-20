import Image from 'next/image'

export function ProductInfo ({ product: { price, name, description } }: any) {
  return (
    <div className='flex justify-around items-center'>
      <Image src='./img/pato404.svg' width='200' height='200' alt='preview' />
      <div>
        <p className='text-xl'>{name}</p>
        <p className='text-dark_gray'>{description}</p>
        <p className='font-bold text-green-600'>${price.toLocaleString()}</p>
      </div>
    </div>
  )
}
