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
      style={{
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: isAdded ? '#16a34a' : '#ea580c', // Green if added, Orange-600 otherwise
        color: '#fff',
        border: 'none',
        borderRadius: '9999px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
      onMouseOver={(e) => !isAdded && (e.currentTarget.style.backgroundColor = '#c2410c')}
      onMouseOut={(e) => !isAdded && (e.currentTarget.style.backgroundColor = '#ea580c')}
    >
      {isAdded ? 'Added to Cart!' : `Add to Cart — ₹${item.price}`}
    </button>
  )
}
