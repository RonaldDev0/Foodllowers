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
    <div className='w-full flex justify-center'>
      <div className='w-[1000px] my-5 [@media(max-width:800px)]:m-0'>
        <Image src='./img/pato404.svg' width='400' height='200' alt='banner image' className='w-full h-[300px] bg-black rounded-lg' />
        {
          influencer && <p className='font-semibold m-3'>{influencer.full_name}</p>
        }
      </div>
    </div>
  )
}
