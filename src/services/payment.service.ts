import { prisma } from "../config/prisma";
import Stripe from "stripe";
import { OrderStatus, PaymentStatus } from "@prisma/client";

const handleStripeWebhooksEvent = async (event: Stripe.Event) => {
  
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      console.log(session, orderId)

      if (!orderId) break;

      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus:
            session.payment_status === "paid"
              ? PaymentStatus.PAID
              : PaymentStatus.FAILED,
          orderStatus: OrderStatus.PROCESSING,
        },
      });
      console.log(`Order ${orderId} updated from checkout.session.completed`);
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata?.orderId;

      if (!orderId) break;

      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.PAID,
        },
      });
      console.log(`Order ${orderId} updated from payment_intent.succeeded`);
      break;
    }

    case "charge.succeeded": {
      const charge = event.data.object as Stripe.Charge;
      const orderId = charge.metadata?.orderId;

      if (!orderId) break;

      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.PAID,
        },
      });
      console.log(`Order ${orderId} updated from charge.succeeded`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return { received: true };
};

export const PaymentService = { handleStripeWebhooksEvent };
