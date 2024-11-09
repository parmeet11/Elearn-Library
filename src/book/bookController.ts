import {Request, Response, NextFunction} from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import fs from "node:fs";
import createHttpError from "http-errors";
import bookModel from "./bookModel";


const createBook = async (req: Request, res: Response, next: NextFunction) => {
    
    const{title, genre} = req.body;
    //console.log("files", req.files);

    const files = req.files as { [fieldname: string]: Express.Multer.File[]};
   
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    const fileName = files.coverImage[0].filename;

    const filePath = path.resolve(__dirname, '../../public/data/uploads',fileName);

    try{
    const uploadResult = await cloudinary.uploader.upload(filePath, {

        filename_override: __filename,
        folder: 'book-covers',
        format: coverImageMimeType, 
    })

    const bookFileName = files.file[0].filename;

    const bookFilePath = path.resolve(__dirname, "../../public/data/uploads",bookFileName)

    
    const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
    });

    console.log('bookFileUploadResult', bookFileUploadResult);

    console.log("uploadResult", uploadResult);

    // @ts-ignore
    
    console.log("userId", req.userId);

    const newBook= await bookModel.create({

        title,
        genre,
        author: "66c1168cad4385d3becaaa5e",
        coverImage: uploadResult.secure_url,
        file: bookFileUploadResult.secure_url,
        
    })
// to wrap in try catch
try{
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);
}catch(err){
    console.log('upload err' ,err);

    
    
}
res.status(201).json({id: newBook._id});

}catch (err){
    console.log(err);

    return next(createHttpError(500, "Error while uploading"));
}

    
    

};

export {createBook};