import Link from 'next/link'
import Image from 'next/image'

// Components
import { ILink, Paths } from './Links'

function Links ({ img, title, path }: ILink) {
  return (
    <Link href={path} className='flex items-center gap-2'>
      <Image src={img} alt='icon' width='25' height='25' />
      <span>{title}</span>
    </Link>
  )
}

export default function Pages () {
  return (
    <div className='flex flex-col gap-5'>
      {
        Paths.map(({ img, title, path }: ILink) => <Links key={path} img={img} title={title} path={path} />)
      }
    </div>
  )
}
