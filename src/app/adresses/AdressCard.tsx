import Image from 'next/image'

type IAdress = {
  name: string,
  adress: string,
  setOpen: Function
}

export default function AdressCard ({ name, adress, setOpen }: IAdress) {
  // const delete = () => {}
  // const edit = () => {}

  return (
    <div className='bg-dark_bg m-5 p-2 rounded w-[330px] flex justify-between'>
      <div>
        <span className='text-dark_gray'>{name}</span>
        <p className='text-lg font-medium'>{adress}</p>
      </div>
      <div className='flex items-center'>
        <Image onClick={() => setOpen(true)} className='cursor-pointer' width='25' height='25' src='./icons/edit.svg' alt='edit' priority />
        <Image className='m-3 cursor-pointer' width='25' height='25' src='./icons/x.svg' alt='close-icon' priority />
      </div>
    </div>
  )
}
