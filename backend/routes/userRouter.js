import express from "express";
import {
  RegisterUser,
  LoginUser,
  getUserData,
  AdminLogin,
  getAllData,
} from "../controllers/userController.js";
import upload from "../middleWare/multer.js";
import userAuth from "../middleWare/userAuth.js";
import adminAuth from '../middleWare/adminAuth.js'

const userRouter = express.Router();

userRouter.post("/register", upload.single("imageUrl"), RegisterUser);
userRouter.post("/login", LoginUser);
userRouter.get("/data",userAuth, getUserData);
userRouter.post("/admin", AdminLogin);
userRouter.get("/all",adminAuth,getAllData)

export default userRouter;
