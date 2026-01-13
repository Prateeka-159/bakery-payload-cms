'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CancelOrderButtonProps {
  orderId: string
  status: string
}

export default function CancelOrderButton({ orderId, status }: CancelOrderButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/cancel-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      })

      if (res.ok) {
        alert('Order cancelled successfully.')
        router.refresh()
      } else {
        const data = await res.json()
        alert(`Failed to cancel order: ${data.message}`)
      }
    } catch (error) {
      console.error('Cancel order error:', error)
      alert('An error occurred while cancelling the order.')
    } finally {
      setLoading(false)
    }
  }

  // Only show cancel button if status is pending or confirmed
  if (status !== 'pending' && status !== 'confirmed') {
    return null
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-xs font-bold text-red-600 hover:text-red-800 border-2 border-red-100 hover:border-red-200 px-3 py-1 rounded-lg transition-all disabled:opacity-50"
    >
      {loading ? 'Cancelling...' : 'Cancel Order ✕'}
    </button>
  )
}
