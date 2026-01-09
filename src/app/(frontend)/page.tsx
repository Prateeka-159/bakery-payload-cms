/*export default async function Home() {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

  const res = await fetch(
    `${baseURL}/api/bakery-items?depth=1`,
    { cache: 'no-store' }
  )

  const data = await res.json()

  return (
    <main>
      <h1>Bakery Items</h1>

      <ul>
        {Array.isArray(data?.docs) &&
        data.docs.map((item: any) => (
          <li key={item.id}>
            <p>{item.name} – ₹{item.price}</p>
            {item.image?.url && (
              <img src={item.image.url} alt={item.name} width={200} />
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}*/

export default async function HomePage() {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

  // Fetch Home Global
  const res = await fetch(`${baseURL}/api/globals/home`, {
    cache: 'no-store',
  })

  const home = await res.json()

  return (
    <main>
      <h1>{home.heroTitle}</h1>
      <p>{home.heroDescription}</p>
      {home.bannerImage?.url && (
        <img
          src={home.bannerImage.url}
          alt="Banner"
          style={{ width: '400px', marginTop: '20px' }}
        />
      )}
      {home.ctaText && (
        <button>{home.ctaText}</button>
      )}
    </main>
  )
}




