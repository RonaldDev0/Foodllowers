/* eslint-disable camelcase */
'use client'
import { Input } from '@nextui-org/react'
import Image from 'next/image'

export interface IProps {
  paymentInfo: any
  setPaymentInfo: Function
  paymentError: any
  setPaymentError: Function
}

export function PaymentForm ({ paymentInfo, setPaymentInfo, paymentError, setPaymentError }: IProps) {
  const getCardType = (cardNumber: string) => {
    // Eliminar espacios en blanco del número de tarjeta y convertir a cadena
    const cardNumberCleaned = cardNumber.replace(/\D/g, '')

    // Patrones para cada tipo de tarjeta basados en los primeros dígitos
    const cardPatterns = {
      visa: { pattern: /^4/, route: '/icons/visa.svg' },
      mastercard: { pattern: /^5[1-5]/, route: '/icons/mc_symbol.svg' },
      amex: { pattern: /^3[47]/, route: '/icons/amex.svg' }
    }

    // Verificar cada patrón
    for (const [, { pattern, route }] of Object.entries(cardPatterns)) {
      if (pattern.test(cardNumberCleaned)) {
        return route // Devuelve el tipo de tarjeta
      }
    }

    return false
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target

    setPaymentError({ ...paymentError, [name]: false })

    if (name === 'card_number' && value.length <= 19) {
      // Eliminar todos los espacios y formatear
      const cleanedValue = value.replace(/\D/g, '')
      let formattedCardNumber = ''

      for (let i = 0; i < cleanedValue.length; i += 4) {
        if (i > 0) formattedCardNumber += ' '
        formattedCardNumber += cleanedValue.substring(i, i + 4)
      }

      if (formattedCardNumber.length <= 19) {
        setPaymentInfo({ ...paymentInfo, [name]: formattedCardNumber })
        if (formattedCardNumber.length === 4) {
          setPaymentInfo({ ...paymentInfo, [name]: formattedCardNumber, card_type: getCardType(value) })
        } else if (formattedCardNumber.length < 4) {
          setPaymentInfo({ ...paymentInfo, [name]: formattedCardNumber, card_type: '' })
        }
      }
    }

    if (name === 'expiration_date' && value.length <= 7) {
      // Eliminar todos los caracteres no numéricos
      const cleanedValue = value.replace(/\D/g, '')

      let formattedExpirationDate = cleanedValue

      // Insertar '/' en la posición correcta si es necesario
      if (cleanedValue.length >= 3) {
        formattedExpirationDate = `${cleanedValue.slice(0, 2)} / ${cleanedValue.slice(2)}`
      }

      // Si el usuario está borrando caracteres, manejar la eliminación del '/'
      if (cleanedValue.length === 2) {
        formattedExpirationDate = cleanedValue
      }

      // Validar y corregir el mes si es necesario
      let [monthPart, yearPart] = formattedExpirationDate.split(' / ')

      if (monthPart?.length === 1 && parseInt(monthPart, 10) > 1) {
        monthPart = `0${monthPart}`
        formattedExpirationDate = `${monthPart}/${yearPart || ''}`
      }

      if (parseInt(monthPart, 10) > 12) {
        formattedExpirationDate = `12 / ${yearPart || ''}`
      }

      // Actualizar paymentInfo con la fecha de expiración formateada
      setPaymentInfo({ ...paymentInfo, [name]: formattedExpirationDate })

      // Verificar si la fecha de expiración es anterior a la fecha actual
      if (formattedExpirationDate.length === 5) {
        const [expMonth, expYear] = formattedExpirationDate.split(' / ')
        const currentDate = new Date()
        const expirationDate = new Date(2000 + parseInt(expYear, 10), parseInt(expMonth, 10) - 1)

        if (expirationDate < currentDate) {
          setPaymentError({ ...paymentError, expiration_date: 'La fecha de expiración es anterior a la fecha actual' })
        }
      }
    }

    if (name === 'cvv' && value.length <= 4) {
      const cleanedValue = value.replace(/\D/g, '')
      setPaymentInfo({ ...paymentInfo, [name]: cleanedValue })
    }

    if (name === 'card_holder' && value.length <= 20) {
      setPaymentInfo({ ...paymentInfo, [name]: value })
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative'>
        <span>Número de la tarjeta</span>
        <Input
          name='card_number'
          value={paymentInfo.card_number}
          onChange={handleChange}
          type='text'
          placeholder='1234 1234 1234 1234'
          isInvalid={!!paymentError.card_number}
          errorMessage={paymentError.card_number}
        />
        {paymentInfo.card_type && (
          <Image
            src={paymentInfo.card_type}
            width={33}
            height={33}
            alt='cvv'
            className={`absolute right-2 ${paymentInfo.card_type === '/icons/amex.svg' ? 'top-1' : 'top-2'} pointer-events-none`}
          />
        )}
      </div>
      <div className='flex gap-8'>
        <div>
          <span>Fecha de expiración</span>
          <Input
            name='expiration_date'
            value={paymentInfo.expiration_date}
            onChange={handleChange}
            type='text'
            placeholder='MM/YY'
            isInvalid={!!paymentError.expiration_date}
            errorMessage={paymentError.expiration_date}
          />
        </div>
        <div>
          <span>CVV</span>
          <div className='relative [@media(max-width:365px)]:!top-6'>
            <Input
              name='cvv'
              value={paymentInfo.cvv}
              onChange={handleChange}
              type='text'
              placeholder='123'
              isInvalid={!!paymentError.cvv}
              errorMessage={paymentError.cvv}
            />
            <Image
              src='/icons/cvv.png'
              width={33}
              height={33}
              alt='cvv'
              className='absolute right-2 top-1 pointer-events-none'
            />
          </div>
        </div>
      </div>
      <div>
        <span>Nombre del titular de la tarjeta</span>
        <Input
          name='card_holder'
          type='text'
          placeholder='Nombre del titular de la tarjeta'
          value={paymentInfo.card_holder}
          isInvalid={!!paymentError.card_holder}
          errorMessage={paymentError.card_holder}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
