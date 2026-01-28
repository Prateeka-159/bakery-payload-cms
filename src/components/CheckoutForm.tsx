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
        paymentMethod: 'cash',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Fast Delivery 🐝</h2>
                <p className="text-sm text-gray-500">Please provide your details for a smooth delivery.</p>
            </div>
            
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Receiver Name</label>
                        <input
                            type="text"
                            name="customerName"
                            required
                            value={formData.customerName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900 bg-gray-50"
                            placeholder="Full Name"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900 bg-gray-50"
                            placeholder="Mobile No."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</label>
                    <textarea
                        name="address"
                        required
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none resize-none text-gray-900 bg-gray-50"
                        placeholder="House No, Building, Street Name..."
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            required
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900 bg-gray-50"
                            placeholder="6-digit ZIP"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Type</label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 transition-colors outline-none text-gray-900 bg-gray-50 appearance-none cursor-pointer"
                        >
                            <option value="cash">Cash on Delivery</option>
                            <option value="upi">UPI on Delivery</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-4 space-y-4">
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <p className="text-xs text-yellow-800 leading-relaxed font-semibold">
                        ⚠️ <span className="underline">Please avoid cancelling orders</span> unless it is a dire situation. Each cancellation wastes transportation costs and impacts our delivery bees. 🐝
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>Place Order 🛒</>
                    )}
                </button>
            </div>
        </form>
    )
}
