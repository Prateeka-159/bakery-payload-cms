import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function AboutUs() {
    const baseURL = 
        process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_SERVER_URL 
        : 'http://localhost:3000'

    let about: any = null

    try {
        const aboutRes = await fetch(`${baseURL}/api/globals/about`, {
            cache: 'no-cache'
        })
        if (aboutRes.ok) {
            about = await aboutRes.json()
        }
    } catch (error) {
        console.error('Failed to fetch about data', error)
    }

    if (!about) return <div className="text-center py-20">Loading...</div>

    return(
        <main className="bg-white min-h-screen">
             <div className="bg-orange-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{about.title}</h1>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg md:prose-xl mx-auto text-gray-600 rich-text">
                    <RichText data={about.text} />
                </div>
            </div>
        </main>
    )
}