import express from 'express'
import { addShippment, getUserShippments, updateShippment,getShippmentByNumber, getAllShippments } from '../controllers/shippmentController.js';
import userAuth from '../middleWare/userAuth.js';
import adminAuth from '../middleWare/adminAuth.js';

const shippmentRouter = express.Router();

shippmentRouter.post('/add',userAuth,addShippment);
shippmentRouter.get('/get',userAuth,getUserShippments);
shippmentRouter.put('/update',adminAuth,updateShippment);
shippmentRouter.get('/number',userAuth,getShippmentByNumber)
shippmentRouter.get('/all',adminAuth,getAllShippments);

export default shippmentRouter