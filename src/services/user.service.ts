import { Role, User } from "@prisma/client";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import  HttpStatus  from "http-status";
import ApiError from "../errors/ApiError";
import { jwtHelpers } from "../utils/jwtHelpers";
import config from "../config";
import { Secret } from "jsonwebtoken";

const registeruser = async(payload: Partial<User>)=>{
    
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email,
        }
    });

    if (existingUser) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "User already exists");
    }


    const hashedPassword = await bcrypt.hash(payload.password as string, Number(config.salt_round));

    const result: User = await prisma.user.create({
        data: {
            name: payload.name as string,
            email: payload.email as string,
            password: hashedPassword,
            role: Role.USER,
        }
    });

    return payload;
};

const registerAdmin = async(payload: Partial<User>)=>{
    const userData = {
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123"
    }

    const hashPass = await bcrypt.hash(userData.password, Number(config.salt_round));

    const result = await prisma.user.create({
    data: {
       name: userData.name,
       email: userData.email,
       password: hashPass,
        role: Role.ADMIN, 
    }
    })

    return result;
};


const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });


    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

    if (!isCorrectPassword) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Password is incorrect!")
    };

    const accessToken = jwtHelpers.generateToken({ email: user.email, role: user.role }, config.jwt.jwt_secret as Secret, config.jwt.expires_in as string);



    return {
        accessToken,
    }
}

const getSIngleUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    });
    return user;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}


export const userService = {
    registeruser,
    registerAdmin,
    login, 
    getSIngleUser,
    getAllUsers
};