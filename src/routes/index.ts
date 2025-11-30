import { Router } from "express";
import { userRouter } from "./userr.route";
import { OrderRoute } from "./order.route";
import { ChatBotRoutes } from "./chatbot.route";

const router = Router();

router.use("/auth", userRouter);
router.use("/order", OrderRoute);
router.use("/chatbot", ChatBotRoutes);


export default router;