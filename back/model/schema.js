
import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type : String,
        required : [true, "Name is required !"]
    },
    email:{
        type : String,
        required : [true, "This field is reqired !"],
        unique:[true, " This email is already registered ! "]
    },
    phone:{
        type : Number,
        required : [true, "Phone number is required !"],
        unique : [true, "This Phone Number is already registered !"]
    },
    image:{
        type : String
        // require : [true, "This field is reqired !"]
    }
})

const User = mongoose.model("users", schema);

export default User