type props = {
  steps: string[]
  activeStep: number
}

export function Stepper ({ steps, activeStep }: props) {
  return (
    <div className='flex flex-col space-y-4'>
      {steps.map((label, index) => (
        <div key={index} className='flex items-center space-x-2'>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center
            ${index < activeStep
              ? 'bg-green-500 text-white'
              : index === activeStep
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-500'}`}
          >
            {index < activeStep ? '✔️' : index + 1}
          </div>
          {index !== steps.length - 1 && (
            <div className={`w-1 h-4
              ${index < activeStep
                ? 'bg-green-500'
                : 'bg-gray-200'}`}
            >
              {}
            </div>
          )}
          <span className='font-medium'>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
