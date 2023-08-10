'use client'
import { useUserPayment } from '@/store'

function Card ({ item }: any) {
  const { value } = item
  const { setStore } = useUserPayment()

  return (
    <div className='rounded-md p-4 bg-zinc-900 cursor-pointer hover:border transition-all' onClick={() => setStore('addressSelect', value)}>
      <h1>{value.address.line1}</h1>
      <p>{value.address.city}</p>
    </div>
  )
}

export function List ({ setToggleComponent, setToggleComponentContainer }: { setToggleComponent: Function, setToggleComponentContainer: Function }) {
  const { addressList } = useUserPayment()
  return (
    <>
      <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 text-center'>
        {addressList.map(item => <Card key={item.value.address} item={item} />)}
        {addressList.length === 0 ? <p className='text-xl w-56 m-10'>No tienes ninguna direccion registrada </p> : <button className='bg-zinc-900 hover:bg-zinc-700 transition-all p-2 rounded-md text-2xl' onClick={() => setToggleComponentContainer('Cards')}>Seleccionar</button>}
      </form>
      <button className='bg-slate-900 hover:bg-slate-700 transition-all p-2 rounded-md text-2xl' onClick={() => setToggleComponent('Form')}>Agregar una direccion</button>
    </>
  )
}
