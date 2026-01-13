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

    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ message: 'Order ID is required' }, { status: 400 })
    }

    // Find the order and verify ownership
    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
    })

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 })
    }

    // Check if order belongs to the user
    // In Payload 3.0, order.user might be an object or ID depending on depth
    const orderUserId = typeof order.user === 'object' ? order.user.id : order.user

    if (orderUserId !== user.id && user.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    // Only allow cancellation if status is 'pending' or 'confirmed'
    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return NextResponse.json({ message: `Cannot cancel an order that is already ${order.status}` }, { status: 400 })
    }

    // Update the order status
    const updatedOrder = await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        status: 'cancelled',
      },
    })

    // Also update any linked delivery if it exists
    const deliveries = await payload.find({
      collection: 'deliveries' as any,
      where: {
        order: {
          equals: orderId,
        },
      },
    })

    if (deliveries.docs.length > 0) {
      await payload.update({
        collection: 'deliveries' as any,
        id: deliveries.docs[0].id,
        data: {
          deliveryStatus: 'failed',
          notes: 'Order cancelled by user.',
        } as any,
      })
    }

    return NextResponse.json({ message: 'Order cancelled successfully', order: updatedOrder }, { status: 200 })
  } catch (error: any) {
    console.error('Error cancelling order:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
