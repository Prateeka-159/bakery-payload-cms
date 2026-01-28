import React from 'react'
import CheckoutForm from '@/components/CheckoutForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Honeybee',
  description: 'Complete your order and schedule delivery.',
}

export default function CheckoutPage() {
    return (
        <div className="bg-yellow-50 overflow-x-hidden min-h-full">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto space-y-12">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                            Checkout 🐝
                        </h1>
                        <p className="text-lg text-gray-600 max-w-md mx-auto">
                            Almost ready! Just a few details and your fresh treats will be on their way.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="relative">
                        {/* Decorative background blur */}
                        <div className="absolute -top-6 -left-12 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
                        
                        <div className="relative z-10 transition-transform duration-500 hover:scale-[1.01]">
                            <CheckoutForm />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex justify-center items-center gap-8 pt-8 border-t border-yellow-200">
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="text-xl">🚚</span> Fast Delivery
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="text-xl">🛡️</span> Secure Order
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="text-xl">✨</span> Fresh Baked
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
