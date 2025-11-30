import httpStatus from 'http-status';
import { Request } from "express"
import { NextFunction, Response } from "express-serve-static-core"
import createError from 'http-errors';
import ApiError from "../errors/ApiError";
import { jwtHelpers } from '../utils/jwtHelpers';
import config from '../config';

const auth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken;

            if (!token) {
                throw createError(401, "Authentication required");
            }


            const verifyUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as string);

            req.user = verifyUser;

            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
            }

            next();
        } catch (error) {
            next(error)
        }
    }
};

export default auth;