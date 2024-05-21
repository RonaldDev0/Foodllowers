import { NextRequest, NextResponse } from 'next/server'
import { AES } from 'crypto-js'

export async function POST (req: NextRequest) {
  try {
    const { key, data, ignore } = await req.json()

    const encryptKey = process.env.ENCRIPT_KEY!.concat(key)

    function encryptedObj (data: { [key: string]: any }) {
      const encryptedObj: any = {}

      for (const key in data) {
        if (!ignore.includes(key)) {
          encryptedObj[key] = AES.encrypt(
            JSON.stringify(data[key]),
            encryptKey
          ).toString()
        } else {
          encryptedObj[key] = data[key]
        }
      }

      return encryptedObj
    }

    if (!key || !data) {
      return NextResponse.json({ error: 'Invalid request' })
    }

    if (typeof data === 'string') {
      return NextResponse.json(
        AES.encrypt(JSON.stringify(data), encryptKey)
          .toString()
      )
    }

    if (Array.isArray(data)) {
      const response = await Promise.all(
        data.map((item) => encryptedObj(item))
      )
      return NextResponse.json(response)
    }

    if (typeof data === 'object') {
      const response = await encryptedObj(data)
      return NextResponse.json(response)
    }
  } catch (e) {
    return NextResponse.json({ error: e })
  }
}
