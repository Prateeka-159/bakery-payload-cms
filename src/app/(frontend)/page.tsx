import { getPayload } from 'payload'
import config from '@payload-config'
import AnimatedBee from '@/components/AnimatedBee'

export default async function Home(){
  const baseURL =
    process.env.NODE_ENV  === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

  let home: any = null

  try {
    const homeRes = await fetch(`${baseURL}/api/globals/home`, {
      cache: 'no-store',
    })
    if (homeRes.ok) {
        home = await homeRes.json()
    }
  } catch (error) {
    console.error('Failed to fetch home data', error)
  }

  if (!home) return <div className="text-center py-20">Loading...</div>

  return(
    <main>
      {/* Hero Section */}
      <section className="relative bg-yellow-50 py-32 sm:py-48 lg:py-56 overflow-hidden">
        {/* Animated Bee */}
        <AnimatedBee />
        {/* Background Image with Gradient Mask */}
        {home.bannerImage?.url && (
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 sm:opacity-80 translate-x-1/3 sm:translate-x-1/4"
                    style={{ backgroundImage: `url(${home.bannerImage.url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-yellow-50/90 to-transparent"></div>
            </div>
        )}

        {/* Decorative Grid Pattern (Optional - reduce opacity if image exists) */}
        <div className={`absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] ${home.bannerImage?.url ? 'opacity-5' : 'opacity-10'}`}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                {home.heroTitle}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                {home.heroDescription}
            </p>
            <div className="flex justify-start gap-4">
                <a href="/items" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    {home.ctaText}
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section placeholder or additional content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="p-6 rounded-2xl bg-yellow-50">
                    <div className="text-4xl mb-4">🥐</div>
                    <h3 className="text-xl font-bold mb-2">Freshly Baked</h3>
                    <p className="text-gray-600">Every item is baked fresh daily using the finest ingredients.</p>
                </div>
                <div className="p-6 rounded-2xl bg-yellow-50">
                    <div className="text-4xl mb-4">🚚</div>
                    <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                    <p className="text-gray-600">From our oven to your doorstep in no time.</p>
                </div>
                <div className="p-6 rounded-2xl bg-yellow-50">
                    <div className="text-4xl mb-4">❤️</div>
                    <h3 className="text-xl font-bold mb-2">Made with Love</h3>
                    <p className="text-gray-600">Passion runs through every recipe we create.</p>
                </div>
            </div>
        </div>
      </section>
    </main>
  )
}




