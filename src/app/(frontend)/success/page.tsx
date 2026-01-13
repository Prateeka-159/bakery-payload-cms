import React from 'react'
import Link from 'next/link'
import AnimatedBee from '@/components/AnimatedBee'

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-yellow-50 overflow-hidden relative">
            
            {/* Celebration Bees */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatedBee />
            </div>

            <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border-4 border-yellow-400 text-center animate-bounce-subtle">
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner">
                        🎉
                    </div>
                    
                    <h1 className="text-3xl font-black text-gray-900 mb-4">
                        Order Confirmed!
                    </h1>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Your delicious treats are being prepared. Our honeybees will deliver them to your doorstep soon! 🐝✨
                    </p>

                    <div className="space-y-4">
                        <Link 
                            href="/orders" 
                            className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl shadow-lg transition-all"
                        >
                            Track My Order 📦
                        </Link>
                        
                        <Link 
                            href="/" 
                            className="block w-full text-gray-500 hover:text-gray-900 font-semibold text-sm transition-colors"
                        >
                            Return to Home
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 italic text-xs text-gray-400">
                        Payment will be collected at the time of delivery (COD).
                    </div>
                </div>
            </main>



            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 4s ease-in-out infinite;
                }
            ` }} />
        </div>
    )
}
