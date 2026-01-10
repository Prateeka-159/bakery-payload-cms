export default async function Items() {
    const baseURL =
        process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_SERVER_URL 
            : 'http://localhost:3000'

    const itemsRes = await fetch(`${baseURL}/api/items`, {
        cache: 'no-store'
    })
    if (!itemsRes.ok) {
        return <p>Failed to load items</p>
    }
    const item = await itemsRes.json()

    return(
        <main>
            <h1>Bakery Items</h1>
            <ul>
                {Array.isArray(item?.docs) &&
                item.docs.map((item: any) => (
                    <li key={item.id}>
                        <p>{item.name} - ₹{item.price}</p>
                        <p>{item.description}</p>
                        {item.image?.url && (
                        <img src={item.image.url} alt={item.name} />
                        )}
                    </li>
                ))}
            </ul>
        </main>
    )
}