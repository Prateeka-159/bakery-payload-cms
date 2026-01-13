import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: await headers() })

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Items are required' }, { status: 400 })
    }

    const order = await payload.create({
      collection: 'orders',
      data: {
        user: user.id,
        items: items.map((item: any) => ({
            item: item.id,
            quantity: item.quantity,
        })),
        status: 'pending',
      },
    })

    return NextResponse.json({ message: 'Order created successfully', order }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
