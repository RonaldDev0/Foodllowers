/* eslint-disable camelcase */
'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { Card, CardBody, Avatar, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Accordion, AccordionItem, Chip, Checkbox, Pagination } from '@nextui-org/react'

export function ShipmentCard ({ shipment }: { shipment: any }) {
  const { product: { name, preview, influencers: { avatar, full_name } }, transaction_amount: { total }, preferences } = shipment
  const currentOrder = shipment
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [page, setPage] = useState(0)

  return (
    <>
      <Card className='w-96'>
        <CardBody onClick={onOpen} className='p-0'>
          <div className='flex items-center gap-5 rounded-lg cursor-pointer'>
            <Image
              src={preview}
              alt={name}
              width='800'
              height='800'
              className='h-[150px] w-[200px]'
            />
            <div className='mr-5 flex flex-col gap-2'>
              <p className='text-lg'>
                {name} x {preferences.length}
              </p>
              <div className='flex gap-2 justify-center items-center'>
                <Avatar src={avatar} />
                <p className='opacity-50'>{full_name}</p>
              </div>
              <p className='opacity-50'>
                {
                  (total).toLocaleString('es-Es', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    useGrouping: true
                  })
                }
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex justify-center'>
                <div className='flex gap-3'>
                  <p>Factura:</p>
                  <div className='flex justify-center items-center'>
                    <p>{currentOrder.invoice_id.slice(0, -3)}-</p>
                    <p className='font-bold text-lg'>{currentOrder.invoice_id.slice(-3)}</p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-6 overflow-y-auto max-h-[72vh] pr-2'>
                  <div className='flex gap-3 items-center text-sm'>
                    <Info size={40} />
                    <p>Estos son los ingredietes que seleccionaste para tu pedido:</p>
                  </div>
                  <div>
                    <Accordion>
                      {currentOrder.preferences[page]?.categories
                        .filter(({ category }: any) => !(category === 'Acompañantes' || category === 'Bebidas') || currentOrder.preferences[page].isCombo)
                        .map(({ category, items }: any) => (
                          <AccordionItem
                            key={category}
                            aria-label={category}
                            title={(
                              <div className='flex justify-between'>
                                <p>{category}</p>
                                {currentOrder.preferences[page].isCombo && (category === 'Bebidas' || category === 'Acompañantes') && (
                                  <Chip size='sm' color='primary'>
                                    combo
                                  </Chip>
                                )}
                              </div>
                            )}
                          >
                            <div className='flex flex-col'>
                              {items.map(({ name, checked }: any) => (
                                <Checkbox
                                  key={name}
                                  color='danger'
                                  lineThrough
                                  icon={<X size={20} />}
                                  isSelected={checked}
                                >
                                  {name}
                                </Checkbox>
                              ))}
                            </div>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
                  {currentOrder.preferences.length > 1 &&
                    <div className='w-fll flex justify-center'>
                      <Pagination
                        page={page + 1}
                        onChange={e => setPage(e - 1)}
                        total={currentOrder.preferences.length}
                      />
                    </div>}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
