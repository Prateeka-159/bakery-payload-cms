import React from 'react'
import CheckoutForm from '@/components/CheckoutForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Honeybee',
  description: 'Complete your order and schedule delivery.',
}

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-yellow-50">
            
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Info */}
                    <div className="space-y-8 py-8">
                        <h1 className="text-4xl font-black text-gray-900 leading-tight">
                            Almost there! <br />
                            <span className="text-yellow-600">Secure your treats 🐝</span>
                        </h1>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-400 p-2 rounded-lg text-xl">🚚</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Doorstep Delivery</h3>
                                    <p className="text-gray-600 text-sm">We deliver fresh to your specific location.</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-400 p-2 rounded-lg text-xl">💵</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                                    <p className="text-gray-600 text-sm">Pay when your delicious order reaches you.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-400 p-2 rounded-lg text-xl">✨</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Fresh Guarantee</h3>
                                    <p className="text-gray-600 text-sm">Every item is baked fresh just for you.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border-2 border-yellow-100 shadow-sm">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Our delivery bees are ready to swarm! Please provide your accurate phone number and pincode so we can reach you without delay.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative z-10">
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
