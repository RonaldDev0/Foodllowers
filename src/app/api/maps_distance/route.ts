import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const { origin, destination } = await req.json()

  const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&mode=driving&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}`).then(res => res.json())

  return NextResponse.json(response)
}
