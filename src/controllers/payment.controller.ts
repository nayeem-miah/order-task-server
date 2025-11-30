import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import sendResponse from "../utils/sendResponse";
import { stripe } from "../utils/stripe";
import { PaymentService } from "../services/payment.service";
import config from "../config";

const handleStripeWebhooksEvent = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webSecret = config.stripeWebHookSecret;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webSecret);
  } catch (err: any) {
    console.log("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const result = await PaymentService.handleStripeWebhooksEvent(event);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Webhook handled successfully",
    data: result
  });
});

export const PaymentController = { handleStripeWebhooksEvent };
