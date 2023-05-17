export default function Card ({ CardNumber }: { CardNumber: number }) {
  return (
    <div className='bg-gray p-5 rounded text-black'>
      <p>{CardNumber}</p>
    </div>
  )
}
