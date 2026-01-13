import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CartSummary from './CartSummary'

export default async function OrdersPage() {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    redirect('/login?redirect=%2Forders')
  }

  const { docs: orders } = await payload.find({
    collection: 'orders',
    where: {
      user: {
        equals: user.id,
      },
    },
    depth: 2,
    sort: '-createdAt',
  })

  return (
    <main className="bg-yellow-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {/* Cart Section (Client Component) */}
        <CartSummary />

        {/* Order History Section (Server Component) */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            
            {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                You haven't placed any past orders.
            </div>
            ) : (
            <div className="space-y-6">
                {orders.map((order: any) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</span>
                        <p className="text-sm font-medium text-gray-900 font-mono">#{order.id}</p>
                    </div>
                    <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</span>
                        <p className="text-sm font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</span>
                        <p className="text-sm font-bold text-yellow-600">₹{order.totalPrice}</p>
                    </div>
                    <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'paid' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                    </div>
                    
                    <div className="px-6 py-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Items</h4>
                    <ul className="divide-y divide-gray-100">
                        {order.items?.map((orderItem: any, index: number) => {
                        const item = orderItem.item
                        if (!item) return null
                        
                        return (
                            <li key={index} className="py-3 flex justify-between items-center">
                            <div className="flex items-center">
                                {item.image?.url && (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                <img 
                                    src={item.image.url} 
                                    alt={item.name} 
                                    className="w-10 h-10 object-cover rounded mr-3 bg-gray-100"
                                />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.name || 'Unknown Item'}</p>
                                    <p className="text-xs text-gray-500">Qty: {orderItem.quantity}</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                                {typeof item.price === 'number' ? `₹${item.price * orderItem.quantity}` : '-'}
                            </p>
                            </li>
                        )
                        })}
                    </ul>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
      </div>
    </main>
  )
}
