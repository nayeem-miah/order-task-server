import { PaymentMethod } from '@prisma/client';
import { z } from 'zod';

export const orderValidation = {
 createOrder: z.object({
    items: z.array(
      z.object({
        title: z.string().min(1, 'Title is required'),
        price: z.number().positive('Price must be positive'),
        quantity: z.number().int().positive('Quantity must be a positive integer'),
      })
    ).min(1, 'At least one item is required'),
    
    paymentMethod: z.nativeEnum(PaymentMethod),
  }),

  updateOrderStatus: z.object({
    body: z.object({
      orderStatus: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']),
    }),
    params: z.object({
      id: z.string().uuid('Invalid order ID'),
    }),
  }),

  getOrderById: z.object({
    params: z.object({
      id: z.string().uuid('Invalid order ID'),
    }),
  }),
};