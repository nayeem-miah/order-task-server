import { Router } from "express";
import { userRouter } from "./userr.route";
import { OrderRoute } from "./order.route";

const router = Router();

router.use("/auth", userRouter);
router.use("/order", OrderRoute);


export default router;