import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function AboutUs() {
    const baseURL = 
        process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_SERVER_URL 
        : 'http://localhost:3000'

    const aboutRes = await fetch(`${baseURL}/api/globals/about`, {
        cache: 'no-cache'
    })
    if (!aboutRes.ok) {
        return <p>Failed to load items</p>
    }
    const about = await aboutRes.json()

    return(
        <>
            <p>{about.title}</p>
            <RichText data={about.text} />
        </>
    )
}