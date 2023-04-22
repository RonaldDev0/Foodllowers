export type ILink = {
  img: string,
  title: string,
  path: string
}

export const Paths: ILink[] = [
  {
    img: './icons/home.svg',
    title: 'Home',
    path: '/'
  },
  {
    img: './icons/profile.svg',
    title: 'Profile',
    path: '/profile'
  },
  {
    img: './icons/geo.svg',
    title: 'Adresses',
    path: '/adresses'
  },
  {
    img: './icons/clock.svg',
    title: 'Current Shipment',
    path: '/currentshipment'
  },
  {
    img: './icons/clipboard.svg',
    title: 'Shipments',
    path: '/shipments'
  },
  {
    img: './icons/credit-card.svg',
    title: 'Payment Methods',
    path: '/paymentmethods'
  }
]
