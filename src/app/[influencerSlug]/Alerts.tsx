import { Alert } from '@/components/Alert'
import { useContent } from '@/store'

export function Alerts () {
  const { currentInfluencer } = useContent()
  const { open, address } = currentInfluencer.products[0]?.kitchens
  return (
    <>
      {!open && <Alert message='Este restaurante esta cerrado!!' />}
      {!address && <Alert message='Este restaurante aun no esta listo para entregar domicilios' />}
    </>
  )
}
