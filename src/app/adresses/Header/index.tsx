import { AddAddressButton } from './AddAddressButton'
import { UpdateDataButton } from './UpdateDataButton'

export function Header () {
  return (
    <div className='flex flex-col gap-4 items-center justify-between'>
      <UpdateDataButton />
      <AddAddressButton />
    </div>
  )
}
