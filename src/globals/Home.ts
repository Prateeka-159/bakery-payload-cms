import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
    slug: 'home',
    label: 'Home Page',
    access: {
        read: ()=> true,
    },
    fields: [
        {
            name: 'heroTitle',
            label: 'Hero Title',
            type: 'text',
            required: true,
        },
        {
            name: 'heroDescription',
            label: "Hero Description",
            type: 'textarea',
            required: true,
        },
        {
            name: 'bannerImage',
            label: 'Banner Image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'ctaText',
            label: 'Call To Action Text',
            type: 'text',
            defaultValue: 'Order Now',
        },
    ],
}