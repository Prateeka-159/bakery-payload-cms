import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'customerName',
    },
    access: {
        create: ()=> true,
        read: ()=> true,
        update: ()=> true,
        delete: ()=> true,
    },
    hooks: {
        beforeChange: [

            ({ data }) => {
                for (const row of data.items || []) {
                    if (row.quantity < 1) {
                        throw new Error('Quantity must be at least 1')
                    }
                }
                return data
            },

            async ({ data, req }) => {
                let total = 0

                if (Array.isArray(data.items)) {
                    for (const entry of data.items) {
                        if (!entry.item || !entry.quantity) continue

                        // Fetch item from Items collection
                        const itemDoc = await req.payload.findByID({
                        collection: 'items',
                        id: entry.item,
                        })

                        total += itemDoc.price * entry.quantity
                    }
                }

                data.totalPrice = total
                return data
            },
        ],
    },
    fields: [
        {
            name: 'customerName',
            label: 'Customer Name',
            type: 'text',
            required: true,
        },
        {
            name: 'items',
            label: 'Items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'item',
                    label: 'Item',
                    type: 'relationship',
                    relationTo: 'items',
                    required: true,
                },
                {
                    name: 'quantity',
                    label: 'Quantity',
                    type: 'number',
                    required: true,
                    defaultValue: 1,
                },
            ],
        },
        {
            name: 'totalPrice',
            label: 'Total Price',
            type: 'number',
            min: 1,
            admin: {
                readOnly: true,
                step: 1,
            },
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            defaultValue: 'Pending',
            options: [
                {label: 'Pending', value: 'Pending'},
                {label: 'Paid', value: 'paid'},
                {label: 'Delivered', value: 'delivered'},
            ],
        },
    ],
}