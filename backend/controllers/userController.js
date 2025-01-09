import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import fs from "fs";

// إنشاء توكن
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// تسجيل مستخدم جديد
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ 
        success: false, 
        msg: "User already exists" 
      });
    }
     // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        msg: "Enter a valid Email" 
      });
    }
     // Validate password
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        msg: "Enter a strong password" 
      });
    }
     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
     let imageUrl = "";
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
       // Delete local file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error while deleting the file:", err);
      });
    }
     const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      imageUrl,
    });
     const user = await newUser.save();
    const token = createToken(user._id);
     return res.status(201).json({ 
      success: true, 
      token,
      msg:"User registered",
      id:newUser._id 
    });
   } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ 
      success: false, 
      msg: error.message 
    });
  }}
 
// تسجيل الدخول
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, msg: "User not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, msg: "Invalid Credintials" });
    } else {
      const token = createToken(user._id);
      return res.status(201).json({ success: true, token, id:user._id });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// الحصول على بيانات المستخدم
const getUserData = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await userModel
    .findById(userId)
    .select("-password")
    .populate("shipments"); // استخدم "shipments" بدلاً من "Shipments"
  
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        msg: "User not found" 
      });
    }
     console.log("Found user with shipments:", user);
    return res.status(200).json({ 
      success: true, 
      user 
    });
   } catch (error) {
    console.error("Error in getUserData:", error);
    return res.status(500).json({ 
      success: false, 
      msg: error.message 
    });
  }}
  
 
// تسجيل دخول المدير
const AdminLogin = async (req, res) => {
  try {
    const {email,password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
    }else{
      res.json({success:false,msg:"Invalid Credintials"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,msg:error.message})
  }
};

const getAllData = async (req,res) => {
  try {
    const data = await userModel.find();
    res.json({success:true,data})
  } catch (error) {
    console.log(error);
    res.json({success:false,msg:error.message})
  }
}

export { RegisterUser, LoginUser, getUserData, AdminLogin,getAllData };
