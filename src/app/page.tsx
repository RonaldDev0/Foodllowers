'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardBody, Avatar, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { SearchBarr } from '@/components'
import { useSupabase } from './Providers'
import { useContent } from '@/store'

const serviceFee = 5000

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
        .select('id, full_name, qualification, preview, path, products(kitchens( address, open ))')
        .range(0, 10)
        .then((res: any) => {
          const influencers = res.data?.filter((item: any) => item.products[0].kitchens.address !== null)
          setStore('influencerList', influencers)
        })
    )

    !productList && (
      supabase
        .from('products')
        .select('id, preview, name, price, state, influencers( preview, full_name, path ), kitchens( address )')
        .range(0, 10)
        .then(res => {
          const products = res.data?.filter((item: any) => item.kitchens.address !== null)
          setStore('productList', products)
        })
    )
  }, [])

  return (
    <div className='flex flex-col w-full mb-16 items-center gap-12'>
      <SearchBarr message />
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          influencerList?.map(item => (
            <Link href={item.path} key={item.id}>
              <Avatar size='lg' className='w-20 h-20' src={item.preview} />
            </Link>
          ))
        }
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
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
                        <Avatar src={product.influencers.preview} />
                      </Link>
                      <div>
                        <p className='text-xl'>
                          {product.name}
                        </p>
                        <p className='opacity-60'>{product.influencers.full_name}</p>
                      </div>
                    </div>
                    <p className='font-bold text-green-600'>
                      ${(product.price + serviceFee).toLocaleString()}
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
    </div>
  )
}
