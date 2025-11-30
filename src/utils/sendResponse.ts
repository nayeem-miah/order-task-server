import { Response } from 'express';

type IApiResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: {
    path: string;
    message: string;
  }[];
  stack?: string;
};

const sendResponse = <T>(res: Response, data: IApiResponseType<T>) => {
  const responseData: IApiResponseType<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || undefined,
    data: data.data || undefined,
    error: data.error || undefined,
    stack: data.stack || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;