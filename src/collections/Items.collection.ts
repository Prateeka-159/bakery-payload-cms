import { CollectionConfig } from 'payload'

export const Items: CollectionConfig = {
    slug: 'items',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: ({req}) => req.user?.role === 'admin',
        read: () => true,
        update: ({req}) => req.user?.role === 'admin',
        delete: ({req}) => req.user?.role === 'admin',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media'
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'available',
            type: 'checkbox',
            defaultValue: true
        },
    ],
}

