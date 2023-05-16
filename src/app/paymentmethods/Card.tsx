export default function Card ({ CardNumber }: { CardNumber: number }) {
  return (
    <div className='bg-[#D9D9D9] p-5 rounded text-black'>
      <p>{CardNumber}</p>
    </div>
  )
}
