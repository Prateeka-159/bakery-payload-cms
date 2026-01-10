export default async function Home(){
  const baseURL =
    process.env.NODE_ENV  === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : 'http://localhost:3000'

    const homeRes = await fetch(`${baseURL}/api/globals/home`, {
      cache: 'no-store',
    })
    if (!homeRes.ok) {
        return <p>Failed to load items</p>
    }
    const home = await homeRes.json()

    return(
      <main>
        <h1>{home.heroTitle}</h1>
        <p>{home.heroDescription}</p>
        <button>{home.ctaText}</button>
        <hr style={{margin: '40px 0'}} />
      </main>
    )
}




