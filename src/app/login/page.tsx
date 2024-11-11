'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button, Card, CardHeader, CardBody, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Checkbox } from '@nextui-org/react'
import { ClipboardList } from 'lucide-react'
import { useSupabase } from '../Providers'

export const revalidate = 7 * 24 * 60 * 60

export default function Login () {
  const { supabase } = useSupabase()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure()
  const [checked, setChecked] = useState(false)

  function login () {
    if (!checked) {
      onOpenModal()
      return
    }

    supabase.auth
      .signInWithOAuth({ provider: 'google' })
  }

  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <Image
        src='/img/LogName.svg'
        alt='Foodllowers'
        width='500'
        height='120'
        className='fixed bg-zinc-950 rounded-lg
        [@media(max-width:800px)]:top-32
        [@media(max-width:1400px)]:top-28
        [@media(min-width:1500px)]:top-60'
      />
      <Card className='p-10 [@media(max-width:800px)]:p-2 border border-white border-opacity-10'>
        <CardHeader className='justify-center text-2xl'>
          Iniciar sesión
        </CardHeader>
        <CardBody className='justify-center items-center flex flex-col gap-6'>
          <Button
            onPress={() => login()}
            className='flex justify-center items-center gap-2 w-80 py-6 text-lg bg-zinc-950'
          >
            <Image
              src='/icons/google.svg'
              alt='Google'
              width='35'
              height='45'
            />
            <p>
              Continuar con Google
            </p>
          </Button>
          <div className='flex justify-center items-center gap-2'>
            <Checkbox isSelected={checked} onChange={() => setChecked(!checked)} />
            <p className='text-purple-500 cursor-pointer' onClick={onOpen}>
              Terminos y Condiciones de Uso
            </p>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader>
                    <div className='flex flex-col gap-3 justify-center items-center w-full'>
                      <ClipboardList size={30} />
                      <p className='font-semibold text-lg'>
                        Términos y Condiciones de Uso
                      </p>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <div className='overflow-y-auto h-[75vh]'>
                      <b>1. Información General:</b> <br /><br />
                      El uso de la app de Foodllowers implica la aceptación total de estos términos y condiciones. Foodllowers se reserva el derecho de modificar estos términos en cualquier momento. Los usuarios deben revisar regularmente los términos para estar al tanto de cualquier cambio. <br /><br />

                      <b>2. Registro y Seguridad:</b> <br /><br />
                      El usuario es responsable de mantener la confidencialidad de su cuenta y contraseña. En caso de sospecha de uso no autorizado, debe notificar de inmediato a Foodllowers. <br /><br /> Foodllowers no será responsable por cualquier daño o pérdida resultante del incumplimiento de esta obligación. <br /><br />

                      <b>3. Uso del Servicio:</b> <br /><br />
                      El usuario acepta utilizar la app únicamente para fines legales y en conformidad con estos términos. <br /><br /> Cualquier uso indebido o no autorizado puede resultar en la suspensión o cancelación de la cuenta. <br /><br />

                      <b>4. Compras y Transacciones:</b> <br /><br />
                      Todas las compras realizadas a través de la app están sujetas a verificación de disponibilidad de stock, validación de la forma de pago y verificación de la autenticidad de los datos ingresados. <br /><br />

                      <b>5. Política de Reembolsos:</b> <br /><br />
                      Para solicitar un reembolso, el usuario debe enviar fotos del producto y una descripción del problema a fooodllowers@gmail.com. <br /><br /> Los reembolsos serán evaluados caso por caso, y solo se emitirán si el producto recibido no coincide con la descripción original. <br /><br />

                      <b>6. Propiedad Intelectual:</b> <br /><br />
                      Todo el contenido de la app, incluidos textos, gráficos, logotipos y software, es propiedad de Foodllowers o de sus licenciantes y está protegido por las leyes de propiedad intelectual. <br /><br /> El usuario no tiene derecho a utilizar dicho contenido para ningún propósito comercial sin el consentimiento previo por escrito de Foodllowers. <br /><br />

                      <b>7. Privacidad:</b> <br /><br />
                      Los datos personales proporcionados por los usuarios serán tratados conforme a la política de privacidad de Foodllowers. <br /><br /> Los datos no serán compartidos con terceros sin el consentimiento del usuario, salvo en cumplimiento de la ley. <br /><br />

                      <b>8. Comprobación Antifraude:</b> <br /><br />
                      Foodllowers se reserva el derecho de aplazar cualquier compra para una comprobación antifraude.  <br /><br />En caso de sospecha, la transacción puede ser suspendida para una investigación más rigurosa. <br /><br />
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader>
                    <div className='flex flex-col gap-3 justify-center items-center w-full'>
                      <ClipboardList size={30} />
                      <p className='font-semibold text-lg'>
                        Términos y Condiciones de Uso
                      </p>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    para continuar debes aceptar los términos y condiciones de uso
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>
    </main>
  )
}
