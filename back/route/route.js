
import express from "express";
import User from "../model/schema.js";
import AppError  from "../utils/appError.js";


export const router = express.Router();

// get all
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {

    }
})

// delete
router.delete("/user/:id", async (req, res, next) => {
    const data = req.params.id;
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(data);
            res.status(200).json({ message: "User deleted successfully !" })

        }
        else {
            // res.status(200).json({ message: "User does not exist !" })
            throw new AppError("User does not exist with this email", 404)
        }
    } catch (error) {
        
    }
})

// add
router.post("/add", async (req, res, next) => {
    const data = req.body;
    try {
        if(!data.name || !data.email || !data.phone ){
            throw new AppError("All fields are required ", 400);
        }
        else{
        const emailExist = await User.findOne({ email: data.email });
        const phoneExist = await User.findOne({phone: data.phone});
        if (emailExist) {
            throw new AppError("User exist with this mail id", 400);
        }
        else if(phoneExist){
            throw new AppError("User exist with this phone number", 400);
        }
        else {
            const user = new User(data);
            
            await user.save();
           return res.status(201).json({ ...user, message: "success" });
        }
    }
   
    } catch (error) {
       return next(error)
    }
})

// get single
router.get("/user/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        else {
           return res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
})

// update
router.post("/user", async (req, res) => {

    try {

        const emailCheck = await User.findOne({ email: req.body.email })
        // if (!emailCheck) {
            const user = await User.findByIdAndUpdate(req.body._id, req.body);
            res.status(200).json(user);
        // }
        // else{
        //     res.status(400).json({...emailCheck, message:" user exist with this email !"})
        // }

    } catch (error) {

    }
})

