
// const http = require("http");
import http from "http";
const PORT = 3546;
import express from "express";
import cors from "cors";
import {router} from "./route/route.js"; 
import {connection} from "./db/connection.js";
import bodyParser from "body-parser";

const app = express(http);
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
connection();

app.use("/",router);

// for wrong url
app.all("*", (req, res, next)=>{
    const err = new Error(`Requested URL ${req.path} not found !`);
    res.statusCode = 404;
    next(err)
    // res.status(404).json({
    //     success: 0,
    //     message: err.message,
    //     stack: err.stack
    // })
})

// midddleware for every error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success:0, 
        message: err.message,
        stack: err.stack
    })
})


app.listen(PORT, ()=>{
    console.log(`server connected at http://localhost:${PORT}`)
})
