import { Check } from 'lucide-react'

type props = {
  steps: string[]
  activeStep: number
}

export function Stepper ({ steps, activeStep }: props) {
  return (
    <div className='flex flex-col'>
      {steps.map((label, index) => (
        <div key={index} className='flex space-x-2'>
          <div className='flex flex-col items-center'>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500
            ${index < activeStep
                ? 'dark:bg-purple-700 bg-purple-500'
                : index === activeStep
                  ? 'dark:bg-purple-500 bg-purple-300 text-gray-800 dark:text-white'
                  : 'dark:bg-gray-500 bg-gray-200 text-gray-800 dark:text-white'}`}
            >
              {index < activeStep ? <Check /> : index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div className={`w-2 h-8 transition-all duration-500
              ${index < activeStep
                  ? 'dark:bg-purple-900 bg-purple-700'
                  : 'dark:bg-gray-700 bg-gray-400'}`}
              >
                {}
              </div>
            )}
          </div>
          <span className='font-medium text-gray-800 dark:text-white'>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
