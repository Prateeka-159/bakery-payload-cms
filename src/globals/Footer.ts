import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: 'Footer',
    access: {
        read: ()=> true,
    },
    fields: [
        {
            name: 'address',
            label: 'Address',
            type: 'textarea',
            required: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'text',
            required: true,
        },
        {
            name: 'copyright',
            label: 'Copy Right',
            type: 'text',
            required: true,
        },
    ],
}