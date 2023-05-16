import Card from './Card'

export type ICard = {
  CardNumber: number
}

export default function PaymentShiptment () {
  const cardList: ICard[] = [
    {
      CardNumber: 400012356789010
    },
    {
      CardNumber: 400012356789010
    },
    {
      CardNumber: 400012356789010
    }
  ]

  return (
    <div className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
      {
        cardList.map(({ CardNumber }) => <Card key={CardNumber} CardNumber={CardNumber} />)
      }
    </div>
  )
}
