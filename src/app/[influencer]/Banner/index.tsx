import Image from 'next/image'

type IInfluencer = {
  id: number
  qualification: number
  full_name: string
  document_number: string
  gender: string
  preview: string
  bank: string
  path: string
}

export function Banner ({ influencer }: { influencer: IInfluencer }) {
  return (
    <div>
      <Image src='./img/pato404.svg' width='400' height='200' alt='banner image' className='w-full h-[250px] bg-black' />
      {
        influencer && <p className='font-semibold m-3'>{influencer.full_name}</p>
      }
    </div>
  )
}
