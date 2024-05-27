import ShipmentList from './ShipmentList'
import Header from './Header'

export default function Shipments () {
  return (
    <div className='w-full flex flex-col top-12 justify-around items-center'>
      <Header />
      <ShipmentList />
    </div>
  )
}
