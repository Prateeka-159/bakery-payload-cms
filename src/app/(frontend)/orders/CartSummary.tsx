'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CartSummary() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      if (res.ok) {
        clearCart()
        router.refresh() // Refresh server component (Order History)
        alert('Order placed successfully!')
      } else {
        const data = await res.json()
        alert(`Checkout failed: ${data.message}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-4">Add some delicious items from the menu!</p>
        <a 
          href="/items" 
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-2 px-6 rounded-full transition-colors"
        >
          Browse Menu
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-8">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">Current Cart</h2>
      </div>
      
      <div className="p-6">
        <ul className="divide-y divide-gray-100 mb-6">
          {items.map((item) => (
            <li key={item.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center">
                 {item.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4 bg-gray-100" />
                 )}
                 <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Unit Price: ₹{item.price}</p>
                 </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                 <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold disabled:opacity-50"
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span className="px-3 py-1 text-gray-900 font-medium min-w-[3ch] text-center">{item.quantity}</span>
                     <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                    >
                        +
                    </button>
                 </div>
                 
                 <div className="text-right min-w-[80px]">
                    <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                 </div>

                 <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                 >
                    Remove
                 </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
                <span className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Total Amount</span>
                <p className="text-3xl font-extrabold text-yellow-600">₹{totalPrice}</p>
            </div>
            
            <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
            </button>
        </div>
      </div>
    </div>
  )
}
