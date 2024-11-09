import express from "express";
import path from "node:path";
import { createBook } from "./bookController";
import multer from "multer";
import authenticate from "../middlewares/authenticate";


const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    //put limit 10 mb
    limits: {fileSize: 3e7 } //30mb - 30 * 1024 * 1024
})

//Routes
//api//books
//.single- for single value , fields - for more values
bookRouter.post("/", authenticate, upload.fields([             // as a middleware
    {name: "coverImage", maxCount: 1},
    {name: "file", maxCount: 1},

])  ,createBook);


export default bookRouter;