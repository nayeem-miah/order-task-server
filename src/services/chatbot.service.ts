import { prisma } from "../config/prisma";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { openai } from "../utils/openRouter";
import { ChatPayload, ProductPayload } from "../types";


const chatbotSuggestion = async (payload: ChatPayload): Promise<string> => {
  if (!payload?.message) {
    throw new ApiError(httpStatus.BAD_REQUEST, "message is required");
  }

  try {
    const products = await prisma.product.findMany();

    if (!products.length) {
      return "No products available at the moment.";
    }

    const productList = products
      .map((p) => `- ${p.title} (Price: $${p.price}, Stock: ${p.quantity})`)
      .join("\n");

    const prompt = `
You are a product recommendation AI assistant.
User asked: "${payload.message}"

Available products:
${productList}

Instructions:
- Pick the best product(s) directly from the list
- Mention product name, price, and stock
- Give a one-line reasoning
- Do NOT ask for more clarification
- Be concise
`;

    const completion = await openai.chat.completions.create({
      model: "z-ai/glm-4.5-air:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful product assistant AI. Always provide direct recommendation from the product list.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ?? "No suggestion found";

    return reply;
  } catch (error) {
    console.error("Chatbot Service Error:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to get chatbot response");
  }
};

const createProduct = async (payload: ProductPayload[]): Promise<any> => {
  if (!payload || !payload.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product data is required");
  }

  const result = await prisma.product.createMany({
    data: payload,
    skipDuplicates: true, 
  });

  return result;
};

export const ChatBotService = {
  createProduct,
  chatbotSuggestion,
};
