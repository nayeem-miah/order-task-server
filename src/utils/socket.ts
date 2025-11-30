import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.query?.token as string;
    console.log({token})

    if (!token) {
      return next(new Error("Authentication failed: No token"));
    }

    try {
      const decoded = jwt.verify(token, config.jwt.jwt_secret!) as any;
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid Token"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user;

    socket.join(user.id);

    console.log("User connected:", user.id);
  });

  return io;
};

export const getIO = () => io;
