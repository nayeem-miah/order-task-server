import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import auth from "../middleware/auth";
import { Role } from "@prisma/client";
import { validateRequest } from "../middleware/validateRequest";
import { orderValidation } from "../validations/order.validation";

const router = Router();


    router.get("/",
    auth(Role.ADMIN),
    OrderController.getAllOrders);

    router.get("/my-orders",
    auth(Role.USER),
    OrderController.getOrderByEmail);

router.post("/",
    auth(Role.USER),
    validateRequest(orderValidation.createOrder),
    OrderController.createOrder);


export const OrderRoute = router;