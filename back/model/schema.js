
import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type : String,
        require : [true, "This field is reqired !"]
    },
    email:{
        type : String,
        require : [true, "This field is reqired !"],
        unique:[true, " This email is already registered ! "]
    },
    phone:{
        type : Number,
        require : [true, "This field is reqired !"]
    },
    image:{
        type : String
        // require : [true, "This field is reqired !"]
    }
})

const User = mongoose.model("users", schema);

export default User