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

import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function AboutUs(){
  const baseURL =
    process.env.NODE_ENV  === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

    const homeRes = await fetch(`${baseURL}/api/globals/home`, {
      cache: 'no-store',
    })
    const home = await homeRes.json()

    const aboutRes = await fetch(`${baseURL}/api/globals/about`, {
      cache: 'no-store',
    })
    const about = await aboutRes.json()

    return(
      <main>
        <h1>{home.heroTitle}</h1>
        <p>{home.heroDescription}</p>
        <button>{home.ctaText}</button>
        <hr style={{margin: '40px 0'}} />

        <h2>{about.title}</h2>
        <RichText data = {about.text} />
    
      </main>
    )
}




