import { NextRequest, NextResponse } from 'next/server'
import { AES, enc } from 'crypto-js'

export async function POST (req: NextRequest) {
  try {
    const { key, data, ignore } = await req.json()

    const encriptKey = process.env.ENCRIPT_KEY!.concat(key)

    function decryptedObj (data: { [key: string]: any }) {
      const decryptedObj: any = {}

      for (const key in data) {
        if (!ignore.includes(key)) {
          decryptedObj[key] = JSON.parse(
            AES.decrypt(
              data[key],
              encriptKey
            ).toString(enc.Utf8)
          )
        } else {
          decryptedObj[key] = data[key]
        }
      }

      return decryptedObj
    }

    if (!key || !data) {
      return NextResponse.json({ error: 'Invalid request' })
    }

    if (typeof data === 'string') {
      return NextResponse.json(
        JSON.parse(
          AES.decrypt(data, encriptKey)
            .toString(enc.Utf8)
        )
      )
    }

    if (Array.isArray(data)) {
      const response = await Promise.all(
        data.map((item) => decryptedObj(item))
      )
      return NextResponse.json(response)
    }

    if (typeof data === 'object') {
      const response = await decryptedObj(data)
      return NextResponse.json(response)
    }
  } catch (e) {
    return NextResponse.json({ error: e })
  }
}
