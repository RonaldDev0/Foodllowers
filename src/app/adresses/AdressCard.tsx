type IAdress = {
  name: string,
  adress: string
}

export default function AdressCard ({ name, adress }: IAdress) {
  return (
    <div className='bg-[#D9D9D9] text-black m-5 p-2 rounded w-[330px]'>
      <span className='text-[#747070]'>{name}</span>
      <p className='text-lg font-medium'>{adress}</p>
    </div>
  )
}
