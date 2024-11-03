import { HttpError } from "http-errors";
import { config } from "../config/config";
import {Request, Response, /*NextFunction*/} from 'express'


const globalErrorHandler = (
    err: HttpError , 
    req: Request, 
    res: Response, 
    /*next: NextFunction*/) => {

    const statusCode = err.statusCode || 500;
    

    return res.status(statusCode).json({

        message: err.message,
        errorStack: config.env === "developement" ? err.stack: "", //we can use only in developement not in production
        
    })
};

export default globalErrorHandler;