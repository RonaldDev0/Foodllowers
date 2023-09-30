'use client'
import { useEffect } from 'react'
import { useUserPayment } from '@/store'
import { Card, CardBody } from '@nextui-org/react'

function CardAddress ({ item }: any) {
  const { value } = item
  const { setStore, addressSelect } = useUserPayment()
  const isSelected = addressSelect?.value === value

  return (
    <Card className={`${isSelected && 'border-2 border-purple-950'}`}>
      <CardBody>
        <div className='flex items-center justify-between rounded-md cursor-pointer' onClick={() => setStore('addressSelect', item)}>
          <div>
            <h1>{value.address.line1}</h1>
            <p>{value.address.city}</p>
          </div>
          {isSelected && <div className='w-5 h-5 rounded-xl bg-purple-950'>{}</div>}
        </div>
      </CardBody>
    </Card>
  )
}

export function List ({ setToggleComponent }: { setToggleComponent: Function }) {
  const { addressList, setStore } = useUserPayment()

  useEffect(() => {
    setStore('addressSelect', addressList[addressList.length - 1])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='text-center flex flex-col gap-4'>
      <div className='flex flex-col gap-4 w-96 text-left'>
        {addressList.map(item => <CardAddress key={item.value.address.line1} item={item} />)}
        {addressList.length === 0 && <p className='text-xl w-56 m-10'>No tienes ninguna direccion registrada </p>}
      </div>
      <p className='cursor-pointer' onClick={() => setToggleComponent('Form')}>Agregar una direccion</p>
    </div>
  )
}
