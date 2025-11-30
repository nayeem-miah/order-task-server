import { Request, Response } from "express";
import { userService } from "../services/user.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";


const registerUser = catchAsync(async (req: Request, res: Response) => {
 const result = await userService.registeruser(req.body);

 sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
 })
});

const resgisterAdmin = catchAsync(async (req: Request, res: Response) => {
 const result = await userService.registerAdmin(req.body);          
    sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin registered successfully",
    data: result,
 })
});

const login = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.login(req.body);
    const { accessToken } = result;

   
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user login successfully",
        data: {accessToken}
    })
})


const getSIngleUser = catchAsync(async (req: Request, res: Response) => {   
    const id = req.params.id;
    const result = await userService.getSIngleUser(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});

const getallUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsers(); 
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});


export const UserController = {
    registerUser,
    resgisterAdmin,
    login,
    getSIngleUser,
    getallUsers,
};