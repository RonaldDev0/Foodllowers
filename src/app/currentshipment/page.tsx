export default function CurrentShipment () {
  return (
    <div className='w-full h-screen flex flex-col gap-5 justify-center items-center'>
      <div className='w-full [@media(min-width:800px)]:w-[1200px] h-screen [@media(min-width:800px)]:h-[700px] bg-[#1F1F1F] rounded'>{}</div>
      <span className='[@media(max-width:800px)]:fixed [@media(max-width:800px)]:bottom-10 [@media(max-width:800px)]:bg-[#D9D9D9]'>10:00</span>
    </div>
  )
}
