
// const http = require("http");
import http from "http";
const PORT = 4000;
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

app.use("https://mern-crud-server-back.vercel.app/",router);

app.listen(PORT, ()=>{
    console.log(`server connected at http://localhost:${PORT}`)
})
