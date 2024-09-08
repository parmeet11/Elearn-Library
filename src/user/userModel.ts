import mongoose from "mongoose";
import { User } from "./userTypes";

const userSchema = new mongoose.Schema<User>(
    {

    name: {
        type: String,

        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

},
{ timestamps: true}
);

//creating modal
//users - collection name
export default mongoose.model<User>('User', userSchema, /*'collection name we can give here'*/);