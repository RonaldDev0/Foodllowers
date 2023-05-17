import Image from 'next/image'

type props = {
  setOpen: Function
}

export default function AddModal ({ setOpen }: props) {
  return (
    <div className='w-full flex justify-center items-center h-screen bg-dark_df_bg fixed'>
      <div className='w-[380px] p-10 bg-dark_bg rounded'>
        <div className='w-full flex justify-end'>
          <Image className=' cursor-pointer text-white' onClick={() => setOpen(false)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
        </div>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-5 my-10'>
          <input type='text' placeholder='Name' className='bg-gray rounded p-2 text-black outline-none' />
          <input type='text' placeholder='Adress' className='bg-gray rounded p-2 text-black outline-none' />
          <button onClick={() => setOpen(false)} className='bg-green-600 p-2 mt-5 rounded text-xl w-[300px]'>Add</button>
        </form>
      </div>
    </div>
  )
}
