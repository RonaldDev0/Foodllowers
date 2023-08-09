'use client'

import { useState } from 'react'
import { AddressElement } from './Address'
import { CardElement } from './Cards'
import { Modal } from './Modal'

export function BuyModal ({ currentProduct }: any) {
  const [toggleComponenetContainer, setToggleComponentContainer] = useState<string>('Address')
  return (
    <Modal>
      {toggleComponenetContainer === 'Address' ? <AddressElement setToggleComponentContainer={setToggleComponentContainer} currentProduct={currentProduct} /> : <CardElement currentProduct={currentProduct} />}
    </Modal>
  )
}
