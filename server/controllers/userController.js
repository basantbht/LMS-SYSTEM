import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req,res) => {
    try {

        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })        
        }

        const user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "Email already exits"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
                success: true,
                message: "Account created successfully"
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success: false,
                message: error.message
            })
    }
}

export const login = async (req,res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })        
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        generateToken(res,user,`Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success: false,
                message: error.message
            })
    }
}

export const logout = async (req,res) => {
    try {

        return res.status(200).cookie("token", "", {maxAge:0}).json({message: "Logged out successfully.", success:true})
        
    } catch (error) {
         console.log(error);
        return res.status(500).json({
                success: false,
                message: error.message
            });
    }
}

export const getUserProfile = async (req,res) => {
    try {
        const userId = req.id;
        const user = await userModel.findById(userId).select("-password ");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Profile not found"
            });
        }

        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
         console.log(error);
        return res.status(500).json({
                success: false,
                message: error.message
            });
    }
}

export const updateProfile = async (req,res) => {
    try {

        const userId = req.id;
        console.log(userId)
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await userModel.findById(userId);
        if(!user){
             return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        // Extract publid id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // Extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // Upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name,photoUrl};
        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success: false,
                message: error.message
            });
    }
}