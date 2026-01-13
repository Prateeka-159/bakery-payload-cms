'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Item {
  id: string
  name: string
  price: number
}

export default function AddToCartButton({ item }: { item: Item }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    setLoading(true)
    try {
      // Check if user is logged in
      const res = await fetch('/api/users/me')
      const data = await res.json()

      // In Payload, if no user is logged in, 'user' is null or undefined
      if (!data?.user) {
        // Not logged in -> Redirect to Login
        const currentPath = window.location.pathname
        router.push(`/login?redirect=${currentPath}`)
        return
      }

      // User IS logged in -> Proceed with "Buy" (Mock logic for now)
      alert(`Successfully added ${item.name} to your order!`)
      // Here you would typically add to a Context Cart or call an API to create an Order
      
    } catch (error) {
      console.error('Auth check failed', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      style={{
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#d4a373', // Bakery Gold
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {loading ? 'Checking...' : `Add to Order — ₹${item.price}`}
    </button>
  )
}
