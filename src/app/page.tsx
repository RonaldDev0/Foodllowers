'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { SearchBarr } from '@/components'
import { useSupabase } from './Providers'
import { useContent } from '@/store'

const serviceFee = 2000
const influencer = 2000

export default function Home () {
  const router = useRouter()
  const loginCode = useSearchParams().get('code')
  const { supabase } = useSupabase()
  const { influencerList, productList, setStore } = useContent()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    loginCode && setTimeout(() => router.push('/'), 200)

    !influencerList && (
      supabase
        .from('influencers')
        .select('id, full_name, avatar, path, products(kitchens( address, open ))')
        .neq('bank_account', null)
        .then((res: any) => {
          const influencers = res.data?.filter((item: any) => item.products[0].kitchens.address !== null)
          setStore('influencerList', influencers)
        })
    )

    !productList && (
      supabase
        .from('products')
        .select('id, preview, name, price, state, influencers( avatar, full_name, path, bank_account ), kitchens( address, bank_account )')
        .then(res => {
          const data: any = res.data?.filter((item: any) => item.kitchens.address !== null)
          const data2 = data.filter((item: any) => item.kitchens.bank_account !== null)
          const products = data2.filter((item: any) => item.influencers.bank_account !== null)

          setStore('productList', products)
        })
    )
  }, [])

  return (
    <main className='flex flex-col w-full mb-16 items-center gap-12'>
      <SearchBarr message />
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          influencerList?.map(item => (
            <Link href={item.path} key={item.id}>
              <Avatar size='lg' className='w-20 h-20' src={item.avatar} />
            </Link>
          ))
        }
      </div>
      <div className='flex flex-wrap gap-5 justify-center max-w-7xl'>
        {
          productList?.map((product: any) => (
            <Link href={product?.state ? `/checkout?q=${product.id}` : '#'} key={product.id}>
              <Card>
                <CardBody
                  className='p-0'
                  onClick={() => !product?.state && onOpen()}
                >
                  <Image
                    src={product.preview}
                    width='200'
                    height='200'
                    alt='preview'
                    className='w-[350px] h-[200px]'
                  />
                  {!product?.state && (
                    <Chip color='warning' className='dark:text-white opacity-90 absolute m-2'>
                      Agotado
                    </Chip>
                  )}
                  <div className='p-4 flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                      <Link href={product.influencers.path}>
                        <Avatar src={product.influencers.avatar} />
                      </Link>
                      <div>
                        <p className='text-xl'>
                          {product.name}
                        </p>
                        <p className='opacity-60'>{product.influencers.full_name}</p>
                      </div>
                    </div>
                    <p className='font-bold text-green-600'>
                      ${(product.price + serviceFee + influencer).toLocaleString()}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))
        }
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <p>Producto Agotado</p>
              </ModalHeader>
              <ModalBody>
                <p>Este producto se encuentra agotado temporalmente, puedes revisar mas tarde o el dia siguiente</p>
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onPress={onClose}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  )
}
