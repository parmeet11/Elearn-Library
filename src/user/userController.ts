import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import {User} from "./userTypes";


const createUser = async (req: Request, res: Response, next: NextFunction) => {

    //console.log("reqdata", req.body);
    //return res.json({}); //req.body is undefined because when we use express it does not parse the data because it is disabled by default.

    const {name, email, password} = req.body;
    //validation
    if (!name || !email || !password) 
    {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    //Database Call

    try{

        const user = await userModel.findOne({email}) //*email: email* if key and value are same 
        
        if(user) {
            const error = createHttpError(400, "User is already exist");
            return next(error);
        }

    } catch (err) {

        return next(createHttpError(500,"Error while getting user"));
    }

    



    let newUser: User;
    //password -> hashed
    //secret -> ssssss, again it will be hash like  secret -> ssssss
    //we can solve this by salt because evry time it will create new pattern - to more secure
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
            newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

    } catch {

        return next(createHttpError(500,"Error while getting user"));

    }

    


    //Process
    try {

        //token generation - JWT

    const token = sign({sub: newUser._id}, config.jwtSecret as string, {
        expiresIn: "7d", 
        algorithm: "HS256"
    });

    //Response     //when we create user we use 201
    res.status(201).json({ accessToken: token/*id:newUser._id, message: "User created"*/});

    } catch(err) {

        return next(createHttpError(500,"Error while signing the JWT token"));
    }

    
};



const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email , password } = req.body;

    if(!email || !password ) {

        return next(createHttpError(400, "All fields are required"))
    }

    

        const user = await userModel.findOne({email});
        if(!user) {

            return next(createHttpError(404, "User not found"));
        }

        const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){

        return next(createHttpError(400, "Username or password incorrect"));
    
    }

    //create new token
    const token = sign({sub: user._id}, config.jwtSecret as string, {
        expiresIn: "7d", 
        algorithm: "HS256"
    });

    res.json({accessToken: token});


    
    
}  




    

export {createUser, loginUser};

