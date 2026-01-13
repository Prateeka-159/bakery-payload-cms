'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface Item {
  id: string
  name: string
  price: number
  image?: { url: string }
}

export default function AddToCartButton({ item }: { item: Item }) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image?.url
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm
        ${isAdded
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-yellow-500 hover:bg-yellow-400 text-black'
        }`}
    >
      <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
      <span className="text-xl">{isAdded ? '✓' : '+'}</span>
    </button>
  )
}
