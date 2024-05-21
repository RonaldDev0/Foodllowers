/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchBarr, InfluencerList, ProductList } from '@/components'
// import { useEncrypt, useDecrypt } from '@/hooks'
// import { useUser } from '@/store'

// const string = 'test'
// const object = {
//   user_id: 'test',
//   name: 'test',
//   age: 12,
//   address: 'test'
// }
// const array = [
//   {
//     user_id: 'test',
//     name: 'test',
//     age: 12,
//     address: 'test'
//   },
//   {
//     user_id: 'test',
//     name: 'test',
//     age: 12,
//     address: ''
//   },
//   {
//     user_id: 'test',
//     name: '',
//     age: 12,
//     address: ''
//   }
// ]

export default function Home () {
  // const { userId } = useUser()
  const router = useRouter()
  const loginCode = useSearchParams().get('code')

  useEffect(() => {
    loginCode && setTimeout(() => router.push('/'), 200)
  }, [])

  // useEffect(() => {
  //   if (!userId) return

  //   useEncrypt({
  //     key: userId,
  //     data: array
  //   })
  //     .then(res => {
  //       useDecrypt({
  //         key: userId,
  //         data: res
  //       })
  //         .then(data => {
  //           console.log('encrypt:', res)
  //           console.log('decrypt:', data)
  //         })
  //     })
  // }, [userId])

  return (
    <main className='flex flex-col w-full mb-16 items-center gap-12'>
      <SearchBarr message />
      <InfluencerList />
      <ProductList />
    </main>
  )
}
