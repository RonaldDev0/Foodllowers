import Image from 'next/image'

type props = {
  setOpen: Function
}

export default function AddModal ({ setOpen }: props) {
  return (
    <div className='w-full flex justify-center items-center h-screen bg-[#1f1f1f60] fixed'>
      <div className='w-[380px] p-10 bg-[#1F1F1F] rounded'>
        <div className='w-full flex justify-end'>
          <Image className=' cursor-pointer text-white' onClick={() => setOpen(false)} src='./icons/x.svg' alt='close-icon' width='40' height='40' priority />
        </div>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-5 my-10'>
          <input type='text' placeholder='Name' className='bg-[#D9D9D9] rounded p-2 text-black outline-none' />
          <input type='text' placeholder='Adress' className='bg-[#D9D9D9] rounded p-2 text-black outline-none' />
          <button onClick={() => setOpen(false)} className='bg-green-600 p-2 mt-5 rounded text-xl w-[300px]'>Add</button>
        </form>
      </div>
    </div>
  )
}
