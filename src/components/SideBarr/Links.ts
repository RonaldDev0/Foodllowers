export type ILink = {
  img: string,
  title: string,
  path: string
}

export const Paths: ILink[] = [
  {
    img: './icons/home.svg',
    title: 'Inicio',
    path: '/'
  },
  {
    img: './icons/profile.svg',
    title: 'Perfil',
    path: '/profile'
  },
  {
    img: './icons/geo.svg',
    title: 'Direcciones',
    path: '/adresses'
  },
  {
    img: './icons/clock.svg',
    title: 'Pedido actual',
    path: '/currentshipment'
  },
  {
    img: './icons/clipboard.svg',
    title: 'Pedidos',
    path: '/shipments'
  }
]
