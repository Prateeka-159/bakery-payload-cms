import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      options: [
        {label: 'admin', value: 'admin'},
        {label: 'staff', value: 'staff'},
      ]
    }
  ],
}
