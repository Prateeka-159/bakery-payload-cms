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
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
