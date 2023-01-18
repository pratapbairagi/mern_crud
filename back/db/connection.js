import mongoose from "mongoose";

 export const connection = async () => {
    const url = "mongodb+srv://crud:crud@website.fnpro.mongodb.net/crud?retryWrites=true&w=majority";
//    const url = "mongodb://crud:crud@website-shard-00-00.fnpro.mongodb.net:27017,website-shard-00-01.fnpro.mongodb.net:27017,website-shard-00-02.fnpro.mongodb.net:27017/crudApp?ssl=true&replicaSet=atlas-12lhzb-shard-0&authSource=admin&retryWrites=true&w=majority"

    try{
        mongoose.set('strictQuery', false);
       await mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser: true}).then(res=>{
            console.log("db connected")
        })
        .catch(er=>{
            console.log(er)
        })
    }catch(err){
        console.log("db error",err)
    }
}