import Link from 'next/link'
import { Home, User, MapPin, Clock, Clipboard } from 'lucide-react'

export default function Pages () {
  return (
    <div className='flex flex-col gap-5'>
      <Link href='/' className='flex items-center gap-2'>
        <Home />
        <span>
          Inicio
        </span>
      </Link>
      <Link href='/profile' className='flex items-center gap-2'>
        <User />
        <span>
          Perfil
        </span>
      </Link>
      <Link href='/adresses' className='flex items-center gap-2'>
        <MapPin />
        <span>
          Direcciones
        </span>
      </Link>
      <Link href='/currentshipment' className='flex items-center gap-2'>
        <Clock />
        <span>
          Pedido actual
        </span>
      </Link>
      <Link href='/shipments' className='flex items-center gap-2'>
        <Clipboard />
        <span>
          Pedidos
        </span>
      </Link>
    </div>
  )
}
