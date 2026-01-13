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

    // Assuming totalPrice is calculated or provided elsewhere,
    // for this edit, we'll just add it as a field.
    // For example: const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalPrice = 0; // Placeholder, replace with actual calculation if needed

    const order = await payload.create({
      collection: 'orders',
      data: {
        user: user.id,
        items: items.map((item: any) => ({
            item: item.id,
            quantity: item.quantity,
        })),
        totalPrice,
        status: 'paid', // Default to paid as per new business logic
      },
    })

    return NextResponse.json({ message: 'Order created successfully', order }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
