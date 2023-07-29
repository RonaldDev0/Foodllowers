'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function Carousel () {
  const [index, setIndex] = useState(0)

  const slides: string[] = [
    '../../carousel/0.svg',
    '../../carousel/1.svg',
    '../../carousel/2.svg',
    '../../carousel/3.svg',
    '../../carousel/4.svg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => prevIndex === slides.length - 1 ? 0 : prevIndex + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Image
      src={slides[index]}
      width={601}
      height={338}
      alt='slide'
      priority
      className='[@media(max-width:800px)]:w-[369px] w-[601px] [@media(max-width:800px)]:h-[230px] h-[338px] rounded-lg transition-all'
    />
  )
}
