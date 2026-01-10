export default async function Footer(){
    const baseURL =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_SERVER_URL
            : 'http://localhost:3000'

    const footerRes = await fetch(`${baseURL}/api/globals/footer`, {
        cache: 'no-store',
    })
    if (!footerRes.ok) {
        return <p>Failed to load items</p>
    }
    const footer = await footerRes.json()

    return(
        <>
            <p>Address: {footer.address}</p>
            <p>Email: {footer.email}</p>
            <p>Phone: {footer.phone}</p>
            <p>{footer.copyright}</p>
        </>
    )
}  