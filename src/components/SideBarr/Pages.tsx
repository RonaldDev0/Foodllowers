import Link from 'next/link'
import { Home, User, MapPin, Clock, Clipboard } from 'lucide-react'

const routes = [
  { name: 'Inicio', href: '/', icon: <Home /> },
  { name: 'Perfil', href: '/profile', icon: <User /> },
  { name: 'Direcciones', href: '/adresses', icon: <MapPin /> },
  { name: 'Pedido actual', href: '/currentshipment', icon: <Clock /> },
  { name: 'Pedidos', href: '/shipments', icon: <Clipboard /> }
]

export default function Pages ({ isMobile, setOpen }: { isMobile: boolean, setOpen: Function }) {
  return (
    <div className='flex flex-col gap-5'>
      {routes.map(({ name, href, icon }) => (
        <Link
          key={href}
          href={href}
          className='flex items-center gap-2'
          onClick={() => isMobile && setOpen(false)}
        >
          {icon}
          <span>
            {name}
          </span>
        </Link>
      ))}
    </div>
  )
}
