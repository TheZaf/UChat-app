import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

import { generateToken } from "../lib/utils.js";

export const signUp = async (req, res) => {
    console.log("signup controller called");
    const {fullname,email,password} = req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"all fields are required!"})
        }
        if(password.length < 6){
            return res.status(400).json({error:"password must be more than 6 characters"})
        } 
        const existEmail = await User.findOne({email});
        if(existEmail) return res.status(400).json({message:"email already exist"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            fullname,
            password:hashedPassword,
        })

        if(newUser){
            //jwt token will be here
            generateToken(newUser._id,res);

            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                email:newUser.email,
                fullname:newUser.fullname,
                profilePic:newUser.profilePic,
            })
        }else{
            res.status(400).json({message:"Invalid user!"})
        }       
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
};

export const logIn = async (req, res) => {
    console.log("login controller called");
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"all fields are required!"})   
        }
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({error:"invalid credentials!"})

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({error:"invalid credentials!"})

        //jwt token will be here
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullname:user.fullname,
            profilePic:user.profilePic,
        })
        
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
};

export const logOut = (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge:0}) //DELETE COOKIE
        res.status(200).json({message:"logged out successfully!"})
    } catch (error) {
        res.status(500).json({message:"internal server error"});
        console.log("error in logout controller",error.message);
    }

};

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        const uploaderResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic:uploaderResponse.secure_url},
            {new:true}
        );
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({message:"internal server error"});
        console.log("error in update profile controller",error.message);
    }
};

export const checkAuth = async (req,res) => {
    try {
        return res.status(200).json(req.user);

    } catch (error) {
        res.status(500).json({message:"internal server error"});
        console.log("error in check auth controller",error.message);
    }
};