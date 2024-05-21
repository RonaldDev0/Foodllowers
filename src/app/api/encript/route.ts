import { NextRequest, NextResponse } from 'next/server'
import { AES } from 'crypto-js'

export async function POST(req: NextRequest) {
  const { key, data, ignore } = await req.json()

  const encriptKey = process.env.ENCRIPT_KEY!.concat(key)

  if (!key || !data) {
    return NextResponse.json({ error: 'Invalid request' })
  }

  if (typeof data === 'string') {
    return NextResponse.json(
      AES.encrypt(JSON.stringify(data), encriptKey)
        .toString()
    )
  }

  if (typeof data === 'object') {
    const encryptedObj: any = {}

    for (const key in data) {
      if (!ignore.includes(key)) {
        encryptedObj[key] = AES.encrypt(
          JSON.stringify(data[key]),
          encriptKey
        ).toString()
      } else {
        encryptedObj[key] = data[key]
      }
    }

    return NextResponse.json(encryptedObj)
  }
}
