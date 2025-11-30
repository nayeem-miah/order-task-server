import { Response , Request} from "express";
import { ChatBotService } from "../services/chatBot.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";



const chatbotSugateion = catchAsync(async (req: Request, res: Response) => {
  const response = await ChatBotService.chatbotSuggestion(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Chatbot response fetched successfully",
    data: { reply: response },
  });
});





const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const product = await ChatBotService.createProduct(payload);  
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

export const ChatBotController = {
  createProduct,
  chatbotSugateion
};