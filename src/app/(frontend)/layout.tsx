import React from 'react'
import './styles.css'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import { Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
