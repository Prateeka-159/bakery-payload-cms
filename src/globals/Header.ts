import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
    slug: 'header',
    label: 'Header',
    access: {
        read: ()=> true,
    },
    fields: [
        {
            name: 'logoText',
            type: 'text',
            label: 'Logo Text',
            required: true,
        },
        {
            name: 'navLinks',
            type: 'array',
            label: 'Navigation Links',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
