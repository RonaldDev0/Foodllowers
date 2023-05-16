import AdressCard from './AdressCard'

type IAdress = {
  id: string,
  name: string,
  adress: string
}

export default function ListAdresses ({ setOpen }: { setOpen: Function }) {
  const Addresess: IAdress[] = [
    {
      id: '0',
      name: 'Home',
      adress: 'Calle Peguelo #4-20'
    },
    {
      id: '1',
      name: 'work',
      adress: 'Calle Stefany #4-20'
    }
  ]

  return (
    <div>
      {
        Addresess.map(({ id, name, adress }) => <AdressCard key={id} name={name} adress={adress} setOpen={setOpen} />)
      }
    </div>
  )
}
