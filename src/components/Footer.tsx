export default async function Footer(){
    const baseURL =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_SERVER_URL
            : 'http://localhost:3000'

    let footer: any = null

    try {
        const footerRes = await fetch(`${baseURL}/api/globals/footer`, {
            cache: 'no-store',
        })
        if (footerRes.ok) {
            footer = await footerRes.json()
        }
    } catch (error) {
        console.error('Failed to fetch footer', error)
    }

    if (!footer) return null

    return(
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <p className="flex items-center">
                                <span className="mr-2">📍</span>
                                {footer.address}
                            </p>
                            <p className="flex items-center">
                                <span className="mr-2">📧</span>
                                <a href={`mailto:${footer.email}`} className="hover:text-yellow-400 transition-colors">{footer.email}</a>
                            </p>
                            <p className="flex items-center">
                                <span className="mr-2">📞</span>
                                <a href={`tel:${footer.phone}`} className="hover:text-yellow-400 transition-colors">{footer.phone}</a>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links (Placeholder or from config) */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>
                            <li><a href="/items" className="text-gray-400 hover:text-yellow-400 transition-colors">Menu</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Legal / Copyright */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
                         <p className="text-sm">
                            {footer.copyright}
                        </p>
                        <p className="text-xs text-gray-500 mt-4">
                            Designed with ❤️ for Baking
                        </p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Honeybee. All rights reserved.
                </div>
            </div>
        </footer>
    )
}  