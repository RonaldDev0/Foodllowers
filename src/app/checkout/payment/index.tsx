/* eslint-disable camelcase */
'use client'
import { Card, CardHeader, CardBody, Divider, useDisclosure, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { PaymentForm } from './PaymentForm'
import { PaymentButton } from './PaymentButton'
import { PseForm } from './PseForm'
import { PseButton } from './PseButton'
import { useUser } from '@/store'

interface IProps {
  paymentInfo: any
  setPaymentInfo: Function
  paymentError: any
  setPaymentError: Function
  amount: number
  error: Boolean
  product: any
  shippingCost: number
  tip: number
  influencer: number
  isMaximumOrders: boolean
  isMaximumNumberOfPurchases: boolean
  preferences: any[]
  haveDelivery: boolean
  numberOfProducts: number
  serviceFee: number
  haveCoupon: boolean
  coupon: string
  isMaxDistance: boolean
  mercadopagoComision: number
}

const cardDisabled = false

export function Payment ({
  paymentError,
  setPaymentError,
  paymentInfo,
  setPaymentInfo,
  amount,
  error,
  product,
  shippingCost,
  tip,
  influencer,
  isMaximumOrders,
  isMaximumNumberOfPurchases,
  preferences,
  haveDelivery,
  numberOfProducts,
  serviceFee,
  haveCoupon,
  coupon,
  isMaxDistance,
  mercadopagoComision
}: IProps) {
  const { darkMode } = useUser()

  const [method, setMethod] = useState('pse')
  const [type, setType] = useState('')
  const [number, setNumber] = useState('')
  const [pseError, setPseError] = useState<any>({
    type: null,
    number: null
  })
  const [banks, setBanks] = useState([])
  const [financial_institution, setFinancial_institution] = useState(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure()

  useEffect(() => {
    if (banks.length > 3) return
    fetch('/api/get_payment_methods')
      .then(res => res.json())
      .then(res => setBanks(res.reverse()))
  }, [])

  return (
    <>
      <Card className='w-96 [@media(max-width:365px)]:!w-80'>
        <CardHeader className='flex justify-between z-0'>
          Escoge tu metodo de pago
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex justify-center items-center gap-4'>
            <Button
              className='w-full font-semibold'
              color={method === 'tarjeta' ? darkMode ? 'secondary' : 'warning' : 'default'}
              onClick={() => {
                setMethod('tarjeta')
                onOpen()
              }}
            >
              Tarjeta
            </Button>
            <Button
              className='w-full font-semibold'
              color={method === 'pse' ? darkMode ? 'secondary' : 'warning' : 'default'}
              onClick={() => {
                setMethod('pse')
                onOpen2()
              }}
            >
              PSE
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='justify-center'>
                <p>Información de pago</p>
              </ModalHeader>
              <Divider />
              <ModalBody>
                {
                  cardDisabled
                    ? (
                      <div className='flex flex-col justify-center items-center my-4'>
                        <p>Los pagos con tarjeta están deshabilitados en este momento.</p>
                      </div>
                      )
                    : (
                      <div className='flex flex-col gap-10'>
                        <p>Antes de realizar el pago, asegúrate de que tu pedido esté configurado correctamente.</p>
                        <PaymentForm
                          paymentError={paymentError}
                          setPaymentError={setPaymentError}
                          paymentInfo={paymentInfo}
                          setPaymentInfo={setPaymentInfo}
                        />
                      </div>
                      )
                }
              </ModalBody>
              <ModalFooter>
                <PaymentButton
                  isDisabled={cardDisabled}
                  haveDelivery={haveDelivery}
                  setPaymentError={setPaymentError}
                  paymentInfo={paymentInfo}
                  error={error}
                  amount={amount}
                  product={product}
                  shippingCost={shippingCost}
                  tip={tip}
                  influencer={influencer}
                  isMaximumOrders={isMaximumOrders}
                  isMaximumNumberOfPurchases={isMaximumNumberOfPurchases}
                  preferences={preferences}
                  numberOfProducts={numberOfProducts}
                  serviceFee={serviceFee}
                  haveCoupon={haveCoupon}
                  coupon={coupon}
                  isMaxDistance={isMaxDistance}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='justify-center'>
                <p>PSE</p>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <p>Antes de realizar el pago con PSE, asegúrate de que tu pedido esté configurado correctamente.</p>
                <PseForm
                  type={type}
                  setType={setType}
                  number={number}
                  setNumber={setNumber}
                  pseError={pseError}
                  setPseError={setPseError}
                  financial_institution={financial_institution}
                  setFinancial_institution={setFinancial_institution}
                  banks={banks}
                />
              </ModalBody>
              <ModalFooter>
                <PseButton
                  haveDelivery={haveDelivery}
                  amount={amount}
                  product={product}
                  shippingCost={shippingCost}
                  tip={tip}
                  influencer={influencer}
                  isMaximumOrders={isMaximumOrders}
                  isMaximumNumberOfPurchases={isMaximumNumberOfPurchases}
                  preferences={preferences}
                  numberOfProducts={numberOfProducts}
                  serviceFee={serviceFee}
                  haveCoupon={haveCoupon}
                  coupon={coupon}
                  isMaxDistance={isMaxDistance}
                  type={type}
                  number={number}
                  pseError={pseError}
                  setPseError={setPseError}
                  financial_institution={financial_institution}
                  mercadopagoComision={mercadopagoComision}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
