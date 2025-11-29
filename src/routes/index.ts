import { Router } from "express";
import { userRouter } from "./userr.route";

const router = Router();

router.use("/auth", userRouter);



export default router;