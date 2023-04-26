type props = {
  setOpen: Function
}

export default function AddButton ({ setOpen }: props) {
  return (
    <button onClick={() => setOpen(true)} className='bg-green-600 p-2 rounded text-xl w-[330px]'>
      Add New Address
    </button>
  )
}
