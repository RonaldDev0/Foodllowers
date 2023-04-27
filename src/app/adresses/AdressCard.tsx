import Image from 'next/image'

type IAdress = {
  name: string,
  adress: string
}

export default function AdressCard ({ name, adress }: IAdress) {
  return (
    <div className='bg-[#D9D9D9] text-black m-5 p-2 rounded w-[330px] flex justify-between'>
      <div>
        <span className='text-[#747070]'>{name}</span>
        <p className='text-lg font-medium'>{adress}</p>
      </div>
      <div className='flex items-center'>
        <Image className='cursor-pointer' width='25' height='25' src='./icons/edit.svg' alt='edit' />
        <Image className='m-3 cursor-pointer' src='./icons/x.svg' alt='close-icon' width='20' height='20' priority />
      </div>
    </div>
  )
}
