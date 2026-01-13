import CartLink from './CartLink'

export default async function Header() {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

  let header: any = null

  try {
    const res = await fetch(`${baseURL}/api/globals/header`, {
      cache: 'no-store',
    })
    if (res.ok) {
      header = await res.json()
    }
  } catch (error) {
    console.error('Failed to fetch header', error)
  }

  if (!header) return null

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-extrabold text-yellow-500 tracking-tight hover:text-yellow-400 transition-colors flex items-center gap-2">
              <span className="text-3xl">🐝</span> {header.logoText === 'Backery' ? 'Honeybee' : header.logoText}
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {header.navLinks?.map((link: any, i: number) => (
              <a
                key={i}
                href={link.url}
                className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
             <CartLink />
          </nav>
          
           {/* Mobile menu button placeholder (optional) */}
           <div className="md:hidden">
              {/* Mobile menu icon implementation could go here */}
           </div>
        </div>
      </div>
    </header>
  )
}
