import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validations/user.validations";
import { UserController } from "../controllers/user.controller";
import auth from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();


router.get("/",
    auth(Role.ADMIN),
     UserController.getallUsers
);  

router.get("/:id",
    auth(Role.ADMIN),
     UserController.getSIngleUser
);

router.post("/logout",
    UserController.logout
);




router.post(
    "/register",
    validateRequest(registerSchema),
    UserController.registerUser
 );

router.post(
    "/register-admin",
    UserController.resgisterAdmin
 );

router.post("/login", 
    validateRequest(loginSchema), 
    UserController.login
);


// router.post("/logout");



export const userRouter = router;