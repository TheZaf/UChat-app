import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req,res,next) => {
    try{
        const jwtToken = req.cookies.jwt;
        if(!jwtToken) return res.status(401).json({message:"unauthorized access"})
        
        const verified = jwt.verify(jwtToken,process.env.JWT_SECRET);
        if(!verified) return res.status(401).json({message:"unauthorized access"}) 

        const user = await User.findById(verified.id).select("-password");
        if(!user) return res.status(401).json({message:"unauthorized access,User not found!"})

        req.user = user;
        next();
        }
        catch(error){
            console.log("error in protected route middleware",error.message);
            res.status(500).json({message:"internal server error"})
        }
        
}
