import { Order, OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { calculateTotal } from "../utils/calculateTotal";
import { prisma } from "../config/prisma";
import { stripe } from "../utils/stripe";
import config from "../config";

const createOrder = async ({ user, items, paymentMethod }: any) => {
  const totalAmount = calculateTotal(items);
  

  const userInfo = await prisma.user.findUnique({
    where: { email: user.email }
  });

  if(!userInfo) {
    throw new Error("User not found");
  }

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: userInfo?.id as string,
        items: items as any,
        totalAmount,
        paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        orderStatus: OrderStatus.PENDING,
      },
    });

    let paymentInfo;

    if (order.paymentMethod === PaymentMethod.STRIPE) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            mode: "payment",
            customer_email: userInfo.email,

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Order #${order.id}`,
                        },
                        unit_amount: totalAmount * 100, 
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                orderId: order.id,
                userid: user.id,
            },

            success_url: config.frontendUrl + `/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://docs.stripe.com/`,
        });

        return { clientSecret: session.url }
    } 

    // else if (order.paymentMethod === PaymentMethod.PAYPAL) {
    //   try {
    //     const pp = await paypalService.createOrder(order.id, order.totalAmount);
    //     paymentInfo = { type: "paypal", approvalUrl: pp.approvalUrl };
    //   } catch (err) {
    //     throw new Error("PayPal payment order failed: " + err);
    //   }
    // }

  //   return order

  });
};

const getAllOrders = async (): Promise<Order[]> => {
  return (await prisma.order.findMany({
    include: { user: true }
  }))
}

const getOrderByEmail = async (email: string) => {

const user = await prisma.user.findUnique({
    where: { email }
});

    const result = await prisma.order.findMany({
        where: {
        userId: user?.id
        },
        include: { user: true }
    });
    return result;
            
}

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderByEmail
};