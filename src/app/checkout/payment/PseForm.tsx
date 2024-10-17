/* eslint-disable camelcase */
'use client'
import { Select, SelectItem, Input } from '@nextui-org/react'

type IProps = {
  type: string
  setType: Function
  number: string
  setNumber: Function
  pseError: any
  setPseError: Function
  financial_institution: number | null
  setFinancial_institution: Function
  banks: any[]
}

const options = [
  { value: 'CC', label: 'Cedula de ciudadanía' },
  { value: 'CE', label: 'Cedula de extranjería' },
  { value: 'TI', label: 'Tarjeta de identidad' }
]

export function PseForm ({ type, setType, number, setNumber, pseError, setPseError, financial_institution, setFinancial_institution, banks }: IProps) {
  return (
    <div className='flex flex-col gap-4 my-5'>
      <Select
        placeholder='Seleccione la entidad bancaria'
        selectedKeys={[financial_institution || '']}
        onChange={e => {
          setFinancial_institution(e.target.value)
        }}
      >
        {banks.map(({ id, description }: any) => (
          <SelectItem key={id}>
            {description}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder='Tipo de documento'
        selectedKeys={[type]}
        onChange={e => {
          setPseError((prev: any) => ({ ...prev, type: null }))
          setType(e.target.value)
        }}
        isInvalid={!!pseError.type}
        errorMessage={pseError.type}
      >
        {options.map(({ value, label }) => (
          <SelectItem key={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
      <Input
        placeholder='Número de documento'
        value={number}
        onChange={e => {
          setPseError((prev: any) => ({ ...prev, number: null }))
          setNumber(e.target.value)
        }}
        isInvalid={!!pseError.number}
        errorMessage={pseError.number}
      />
    </div>
  )
}
