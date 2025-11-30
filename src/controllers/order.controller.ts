import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from '../services/order.service';


const createOrder = catchAsync(async (req: Request & {user?:any}, res: Response) => {
    const user = req.user;
    const { items, paymentMethod } = req.body;
    const result = await OrderService.createOrder({ user, items, paymentMethod });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getOrderByEmail = catchAsync(async (req: Request & {user?: any}, res: Response) => {
  const user = req.user;

  const result = await OrderService.getOrderByEmail(user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

// const updateOrder = catchAsync(async (req: Request, res: Response) => {
//   const { orderId } = req.params;
//   const updatedData = req.body;

//   const result = await OrderService.updateOrder(orderId, updatedData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order updated successfully',
//     data: result,
//   });
// });

// const deleteOrder = catchAsync(async (req: Request, res: Response) => {
//   const { orderId } = req.params;

//   const result = await OrderService.deleteOrder(orderId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order deleted successfully',
//     data: result,
//   });
// });

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderByEmail,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
};