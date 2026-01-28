import React from 'react'
import './styles.css'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Honeybee | Freshly Baked Delights',
  description: 'Order fresh pastries and baked goods from Honeybee.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
