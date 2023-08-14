'use client'
import { useUserPayment } from '@/store'

function Card ({ item }: any) {
  const { value } = item
  const { setStore, addressSelect } = useUserPayment()

  const isSelected = addressSelect?.value === value

  return (
    <div className={`${isSelected && 'border border-green-500 bg-zinc-900'} flex  items-center justify-between rounded-md p-4 bg-zinc-900 cursor-pointer transition-all`} onClick={() => setStore('addressSelect', item)}>
      <div>
        <h1>{value.address.line1}</h1>
        <p>{value.address.city}</p>
      </div>
      {isSelected && <div className='w-5 h-5 rounded-xl bg-green-700'>{}</div>}
    </div>
  )
}

export function List ({ setToggleComponent, setToggleComponentContainer }: { setToggleComponent: Function, setToggleComponentContainer: Function }) {
  const { addressList } = useUserPayment()
  return (
    <div className='text-center flex flex-col gap-4'>
      <div className='flex flex-col gap-4 w-96 text-left'>
        {addressList.map(item => <Card key={item.value.address.line1} item={item} />)}
        {addressList.length === 0 ? <p className='text-xl w-56 m-10'>No tienes ninguna direccion registrada </p> : <button className='bg-green-900 hover:bg-green-700 transition-all p-2 rounded-md text-2xl' onClick={() => setToggleComponentContainer('Cards')}>Seleccionar</button>}
      </div>
      <p className='cursor-pointer' onClick={() => setToggleComponent('Form')}>Agregar una direccion</p>
    </div>
  )
}
