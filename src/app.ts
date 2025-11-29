import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";


const app = express();


app.use(cors()); 
app.use(compression()); 
app.use(express.json()); 

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);



app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API is running" });
});



export default app;
