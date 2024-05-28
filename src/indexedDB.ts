import Dexie, { Table } from 'dexie'

interface IAddress {
  id: string
  user: any
  number: string
  numberPrefix: string
  aditionalInfo: any
}

interface IShipment {
  id: string
  product: string
}

export class IndexedDBClass extends Dexie {
  addresses!: Table<IAddress>
  addressSelect!: Table<IAddress>
  shipmentList!: Table<IShipment>

  constructor () {
    super('indexedDB')
    this.version(1).stores({
      addresses: 'id, address',
      addressSelect: 'id, address',
      shipmentList: 'id, product'
    })
  }
}

export const indexedDB = new IndexedDBClass()
