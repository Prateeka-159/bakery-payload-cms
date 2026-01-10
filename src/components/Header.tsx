export default async function Header() {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

  const res = await fetch(`${baseURL}/api/globals/header`, {
    cache: 'no-store',
  })
  if (!res.ok) {
      return <p>Failed to load items</p>
  }
  const header: any = await res.json()

  return (
    <header style={{ padding: '20px', borderBottom: '1px solid #333' }}>
      <strong>{header.logoText}</strong>

      <nav style={{ marginTop: '10px' }}>
        {header.navLinks?.map((link: any, i: number) => (
          <a
            key={i}
            href={link.url}
            style={{ marginRight: '15px' }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
