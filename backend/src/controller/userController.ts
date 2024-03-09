import UserModel from "../models/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt"

export const login = async(req: Request, res: Response) => {
    const {email, password}= req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user)
            return res.status(201).json({msg: "Invalid Email or Password!!!"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(202).json({msg: "Invalid Email or Password!!!"})
        return res.status(200).json({msg: "Login Successful", user})
    } catch (error:any) {
        return res.status(500).json({msg: "Internal Server Error"});      
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    try {
        const usernameCheck = await UserModel.findOne({ username });
        if (usernameCheck)
            return res.status(201).json({ msg: "The username already exist!!" })
        const emailCheck = await UserModel.findOne({ email })
        if (emailCheck)
            return res.status(202).json({ msg: "Email Already Exist!!" })
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPass
        })
        return res.status(200).json({ msg: "user created successfully", newUser })
    } catch (error: any) {
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}
