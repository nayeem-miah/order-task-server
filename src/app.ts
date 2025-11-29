import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./routes";
import cookieParser from "cookie-parser";


const app = express();


app.use(cors()); 
app.use(compression()); 
app.use(express.json()); 

app.use(cookieParser());

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
