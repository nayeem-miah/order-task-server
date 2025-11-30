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
    meta: result.meta,
    data: result.data,
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

const upddateStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;


  const result = await OrderService.upddateStatus(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});



export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderByEmail,
upddateStatus
};