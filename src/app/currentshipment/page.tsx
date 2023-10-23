'use client'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

const steps = ['cocinando...', 'recogiendo...', 'entregando...', 'entregado']

export default function CurrentShipment () {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className='h-screen flex justify-center items-center'>
      <Card className='p-3'>
        <CardHeader className='w-full flex justify-center'>
          Pedido Actual
        </CardHeader>
        <CardBody className='flex justify-center w-96 px-20'>
          {steps.map((item, index) => (
            <div key={index} className='flex flex-col'>
              <div className='flex gap-10'>
                <div className={` w-12 h-12 flex justify-center items-center transition-all rounded-full
                  ${activeStep >= index ? 'bg-blue-800' : 'bg-blue-950'}
                  ${activeStep === index ? 'text-white' : 'text-gray-500'}
                  `}
                >
                  {activeStep > index
                    ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4.5 12.75l6 6 9-13.5'
                        />
                      </svg>
                      )
                    : index + 1}
                </div>
                <p className={`
                  ${activeStep > index && 'text-blue-900'}
                  ${activeStep < index && 'text-gray-600'} mt-2`}
                >
                  {item}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-1 flex-grow h-20 transition-all ml-5
                  ${activeStep > index ? 'bg-blue-800' : 'bg-blue-950'}`}
                />
              )}
            </div>
          ))}
        </CardBody>
        <CardFooter className='flex justify-around'>
          <Button
            onPress={() => activeStep > 0 && setActiveStep(activeStep - 1)}
          >
            Back
          </Button>
          <Button
            color='primary'
            onPress={() => activeStep < steps.length - 1 && setActiveStep(activeStep + 1)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
