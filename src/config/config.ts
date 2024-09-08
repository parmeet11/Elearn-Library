import {config as conf} from 'dotenv';

conf();


const _config = {

    port : process.env.PORT,

    databaseURL : process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,//jwt.io
}

           

export const config = Object.freeze(_config); //read only 

