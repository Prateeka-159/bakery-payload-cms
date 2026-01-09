import { GlobalConfig } from 'payload'

export const About: GlobalConfig ={
    slug: 'about',
    label: 'About Us',
    access: {
        read: ()=> true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'text',
            type: 'richText',
            required: true,
        },
    ],
}