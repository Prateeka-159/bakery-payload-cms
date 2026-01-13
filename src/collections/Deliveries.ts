import { CollectionConfig } from 'payload'

export const Deliveries: CollectionConfig = {
  slug: 'deliveries',
  admin: {
    useAsTitle: 'order',
    defaultColumns: ['order', 'deliveryStatus', 'pincode', 'updatedAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'order',
      label: 'Order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'deliveryStatus',
      label: 'Delivery Status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Out for Delivery', value: 'out_for_delivery' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Delivery Failed', value: 'failed' },
      ],
      required: true,
    },
    {
      name: 'customerName',
      label: 'Receiver Name',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'deliveryAddress',
      label: 'Delivery Address',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'pincode',
      label: 'Pincode',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'notes',
      label: 'Delivery Notes',
      type: 'textarea',
    },
  ],
}
