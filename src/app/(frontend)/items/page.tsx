import React from 'react'
import AddToCartButton from '@/components/AddToCartButton'

export default async function Items() {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

  let items = []

  try {
    const itemsRes = await fetch(`${baseURL}/api/items`, {
      cache: 'no-store',
    })
    if (itemsRes.ok) {
        const itemData = await itemsRes.json()
        items = itemData.docs || []
    }
  } catch (error) {
    console.error('Failed to fetch items', error)
  }

  // Basic styles for a clean Grid layout
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const cardStyle: React.CSSProperties = {
    border: '1px solid #eee',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    transition: 'transform 0.2s',
  }

  return (
    <main style={{ backgroundColor: '#fefce8', minHeight: '100vh', padding: '2rem 0' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem', color: '#1a1a1a' }}>
        Fresh From the Oven
      </h1>
      
      {items.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No items found or failed to load.</p>
      ) : (
        <div style={gridStyle}>
          {items.map((item: any) => (
            <div key={item.id} style={cardStyle}>
              {/* Image Section */}
              <div style={{ marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', height: '200px', backgroundColor: '#f0f0f0' }}>
                {item.image?.url ? (
                   /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={item.image.url} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                    No Image
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{item.name}</h2>
                    <span style={{ fontWeight: 'bold', color: '#d4a373' }}>₹{item.price}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 1rem 0', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {item.description}
                </p>
              </div>

              {/* Action Section */}
              <AddToCartButton item={item} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
