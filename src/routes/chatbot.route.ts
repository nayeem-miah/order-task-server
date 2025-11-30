import { Router } from "express";
import { ChatBotController } from "../controllers/chatbot.controller";

const router = Router();


router.post('/', ChatBotController.chatbotSugateion);



router.post("/products", ChatBotController.createProduct);

export const ChatBotRoutes = router;