import express from 'express';
import { getAllCompaniesData, getCompanyData, loginCompany, registerCompany } from '../controllers/companyController.js';
import upload from '../middleWare/multer.js';
import companyAuth from '../middleWare/companyAuth.js';
import adminAuth from '../middleWare/adminAuth.js'
const companyRouter = express.Router();

companyRouter.post('/register',upload.single("imageUrl"),registerCompany)
companyRouter.post('/login',loginCompany)
companyRouter.get('/data',companyAuth,getCompanyData);
companyRouter.get('/all',adminAuth,getAllCompaniesData);

export default companyRouter;