import { Order } from "@prisma/client";

export interface PaginatedOrders {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}


export interface ProductPayload {
  title: string;
  price: number;
  quantity: number;
}

export interface ChatPayload {
  message: string;
  userId?: string; 
}