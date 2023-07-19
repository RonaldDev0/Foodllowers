
import Image from 'next/image'
export function SearchBarr () {
  return (
    <div className='mt-24 flex flex-col items-center'>
      <p className='text-xl m-2'>¿Cuál es tu influenciador favorito?</p>
      <form className='flex'>
  
        <button className='bg-dark_bg p-3 rounded-r-lg'>
          <Image src='./icons/search.svg' width='30' height='30' alt='search.svg' />
        </button>
      </form>
    </div>
  )
}
