import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => {
      if (!req.user) return false
      return {
        user: {
          equals: req.user.id,
        },
      }
    },
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // 1. Assign the Order to the Logged-In User
        if (req.user) {
          data.user = req.user.id
        }

        // 2. Calculate Total Price securely
        let total = 0
        
        if (data.items && Array.isArray(data.items)) {
          for (const row of data.items) {
            if (row.quantity < 1) {
                throw new Error('Quantity must be at least 1')
            }

            if (row.item) {
                try {
                  const itemDoc = await req.payload.findByID({
                      collection: 'items',
                      id: row.item,
                  })
                  
                  if (itemDoc && typeof itemDoc.price === 'number') {
                      total += itemDoc.price * row.quantity
                  }
                } catch (error) {
                  // Ignore invalid items
                }
            }
          }
        }

        data.totalPrice = total
        return data
      },
    ],
  },
  fields: [
    {
      name: 'user',
      label: 'Customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
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
          min: 1,
          defaultValue: 1,
          required: true,
        },
      ],
    },
    {
      name: 'totalPrice',
      label: 'Total Price',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Delivered', value: 'delivered' },
      ],
    },
  ],
}
