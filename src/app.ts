import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./routes";
import { PaymentController } from "./controllers/payment.controller";

const app = express();

app.use(compression());
app.use(cookieParser());


app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhooksEvent
);


app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use('/api/v1', router);


app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API is running" });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
