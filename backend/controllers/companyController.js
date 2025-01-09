import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import companyModel from "../models/companyModel.js";
import fs from "fs";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.COMPANY_JWT_SECRET);
};
// Register Company
const registerCompany = async (req, res) => {
  const { name, email, password, field } = req.body;
   try {
    // Check if company exists
    const exists = await companyModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ 
        success: false, 
        msg: "Company already exists" 
      });
    }
     // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        msg: "Please enter a valid email address" 
      });
    }
     // Validate password
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        msg: "Password must be at least 8 characters long" 
      });
    }
     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
     let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }
     const newCompany = new companyModel({
      name,
      email,
      password: hashedPassword,
      field,
      imageUrl,
    });
     const company = await newCompany.save();
     const token = createToken(company._id);
     return res.status(201).json({ 
      success: true, 
      token,
      msg: "Company registered successfully",
      id:newCompany._id 
    });
   } catch (error) {
    return res.status(500).json({ 
      success: false, 
      msg: error.message 
    });
  }}
 
// Login Company
const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await companyModel.findOne({ email });

    if (!user) {
    return res.json({ success: false, msg: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.json({ success: false, msg: "Invalid Credintials" });
    } else {
      const token = createToken(user._id);
    return  res.json({ success: true, token,id:user._id });
    }
  } catch (error) {
    return  res.json({ success: false, msg: error.message });
  }
};

// Get Company Data
const getCompanyData = async (req, res) => {
  try {
    const { companyId } = req.query;
    const user = await companyModel.findById(companyId).populate("shipments");
    
    if (!user) {
      res.json({ success: false, msg: "User is not defined" });
    } else {
      res.json({ success: true, user });
    }
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getAllCompaniesData = async (req,res) =>{
  try {
    const data = await companyModel.find();
    res.json({success:true,data})
  } catch (error) {
    console.log(error);
    res.json({success:false,msg:error.message})
  }
}

export { registerCompany, loginCompany, getCompanyData,getAllCompaniesData };
