/*import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}*/

/*export default async function Home() {
  const res = await fetch('http://localhost:3000/api/bakery-items', {
    cache: 'no-store',
  })

  const data = await res.json()

  return (
    <main>
      <h1>Bakery Items</h1>
      <ul>
        {data.docs.map((item: any) => (
          <li key={item.id}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </main>
  )
}*/

export default async function Home() {
  const res = await fetch(
    'http://localhost:3000/api/bakery-items?depth=1',
    { cache: 'no-store' }
  )

  const data = await res.json()

  return (
    <main>
      <h1>Bakery Items</h1>

      <ul>
        {data.docs.map((item: any) => (
          <li key={item.id}>
            <p>
              {item.name} – ₹{item.price}
            </p>

            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.name}
                width={200}
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}


