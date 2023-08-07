import Link from 'next/link'
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

export function InfluencerCard ({ influencer }: { influencer: IInfluencer }) {
  const { qualification, full_name: fullName, path, preview } = influencer

  return (
    <Link href={path} className='bg-bg_card hover:bg-bg_card_hover transition-all rounded-lg p-3'>
      <Image src={preview} width='200' height='200' alt='img preview' className='w-[350px] h-[200px] rounded-lg' />
      <p className='text-xl'>{fullName}</p>
      <p>⭐{qualification}</p>
    </Link>
  )
}
