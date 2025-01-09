import express from "express";
import {
  addCompanyShippment,
  getCompanyShippments,
  updateCompanyShippment,
  getShippmentByNumber,
  getAllCompanyShippments,
} from "../controllers/companyShippmentsController.js";
import companyAuth from "../middleWare/companyAuth.js";
import adminAuth from "../middleWare/adminAuth.js";

const companyShippmentsRouter = express.Router();

companyShippmentsRouter.post('/add',companyAuth,addCompanyShippment);
companyShippmentsRouter.get('/get',companyAuth,getCompanyShippments);
companyShippmentsRouter.put('/update',adminAuth,updateCompanyShippment);
companyShippmentsRouter.get('/number',companyAuth,getShippmentByNumber);
companyShippmentsRouter.get('/all',adminAuth,getAllCompanyShippments)

export default companyShippmentsRouter;
