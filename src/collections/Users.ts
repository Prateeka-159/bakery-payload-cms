import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Anyone can sign up
    create: () => true,

    // Users see only themselves, Admins see everyone
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      
      return {
        id: {
          equals: user.id,
        },
      }
    },

    // Users update only themselves, Admins update everyone
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true

      return {
        id: {
          equals: user.id,
        },
      }
    },

    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // Email is added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
        { label: 'Customer', value: 'customer' },
      ],
      access: {
        // Only admins can change roles (prevent users from making themselves admins)
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}
