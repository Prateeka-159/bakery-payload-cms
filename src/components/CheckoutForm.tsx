'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CheckoutForm() {
    const { items, clearCart } = useCart()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        address: '',
        pincode: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (items.length === 0) {
            setError('Your cart is empty')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    ...formData,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                clearCart()
                router.push('/success')
            } else {
                setError(data.message || 'Failed to place order')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border-2 border-yellow-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details 🐝</h2>
            
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Receiver Name</label>
                    <input
                        type="text"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900"
                        placeholder="e.g. John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900"
                        placeholder="e.g. +1234567890"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
                    <textarea
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none resize-none text-gray-900"
                        placeholder="Street address, Apartment, Suite, etc."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode / ZIP Code</label>
                    <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900"
                        placeholder="e.g. 110001"
                    />
                </div>
            </div>

            <div className="pt-4">
                <p className="text-sm text-gray-500 mb-4 text-center italic">
                    * Cash on Delivery (COD) only. Please keep exact change ready.
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>Place Order (COD) 🛒</>
                    )}
                </button>
            </div>
        </form>
    )
}
