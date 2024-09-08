import mongoose from "mongoose";
import {config} from "./config";


const connectDB = async () => {

    try{
// we have to register this first 
        mongoose.connection.on('connected', () => {

            console.log("Connection is successfull");
        });

        mongoose.connection.on('error', (err) => {
            console.log("Error in connection", err);
        })

        await mongoose.connect(config.databaseURL as string);

        

    } catch(err){

        console.error("Failed to connect");
        process.exit(1);
    }
};

export default connectDB;