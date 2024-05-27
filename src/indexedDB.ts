import Dexie, { Table } from 'dexie'
import type { IAddress } from './store/useUser'

interface IShipment {
  id: string
  product: string
}

export class IndexedDBClass extends Dexie {
  addressList!: Table<IAddress>
  addressSelect!: Table<IAddress>
  shipmentList!: Table<IShipment>

  constructor () {
    super('indexedDB')
    this.version(1).stores({
      addressList: 'id, user_id, formatted_address, partial_match, place_id, user, number, numberPrefix, aditionalInfo, address_components, geometry, types, plus_code',
      addressSelect: '++id, address_id',
      shipmentList: 'id, product'
    })
  }
}

export const indexedDB = new IndexedDBClass()
