import { AddressList } from './AddressList'
import { Header } from './Header'

export default function Adresses () {
  return (
    <div className='w-full h-screen flex flex-col top-12 justify-center items-center gap-8'>
      <Header />
      <AddressList />
    </div>
  )
}
