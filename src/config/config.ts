import {config as conf} from 'dotenv';

conf();


const _config = {

    port : process.env.PORT,

    databaseURL : process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,//jwt.io
    cloudinaryCloud : process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey : process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET ,
}

           

export const config = Object.freeze(_config); //read only 

