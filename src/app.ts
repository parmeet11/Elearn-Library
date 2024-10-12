import express from 'express';
//import { Request, Response, /*NextFunction*/ } from 'express';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './user/userRouter';
import bookRouter from './book/bookRouter';
//import { config } from './config/config';

const app = express();

app.use(express.json()); //it is a middleware used for json parsing.

//Routes
//http methods
app.get('/', (req, res, /*next*/) =>{

    //throw new Error("Something went wrong")

    const error = createHttpError(400, "Something went wrong");

    throw error;

    res.json({message: "Welcome to elearn"});

});

app.use("/api/users",userRouter);
app.use("/api/users",bookRouter);

//global error handler (should be at the last of the routes)

app.use(globalErrorHandler);





export default app;