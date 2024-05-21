import { NextRequest, NextResponse } from 'next/server'
import { AES, enc } from 'crypto-js'

export async function POST (req: NextRequest) {
  const { key, data, ignore } = await req.json()

  const encriptKey = process.env.ENCRIPT_KEY!.concat(key)

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

  if (typeof data === 'object') {
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

    return NextResponse.json(decryptedObj)
  }
}
