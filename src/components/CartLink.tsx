'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartLink() {
  const { items } = useCart()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate total quantity
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link
      href="/orders"
      className="relative text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
    >
      Orders
      {mounted && totalItems > 0 && (
        <span className="absolute -top-1 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-black shadow-sm flex items-center justify-center h-[18px]">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
