
import express from "express";
import User from "../model/schema.js";

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
router.delete("/user/:id", async (req, res) => {
    const data = req.params.id;
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(data);
            res.status(200).json({ message: "User deleted successfully !" })

        }
        else {
            res.status(200).json({ message: "User does not exist !" })
        }
    } catch (error) {

    }
})

// add
router.post("/add", async (req, res) => {
    const data = req.body;
    try {
        const userExist = await User.findOne({ email: data.email })
        if (!userExist) {

            const user = new User(data)
            await user.save()
            res.status(201).json({ ...user, message: "success" })
        }
        else {
            res.status(202).json(data)

        }
    } catch (error) {
        res.status(400).json({message:error})
    }
})

// get single
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
        }
        else {
            res.status(200).json(user);
        }
    } catch (error) {

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

