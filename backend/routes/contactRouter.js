import express from 'express'
import adminAuth from '../middleWare/adminAuth.js'
import { addContact, dispalyAllContacts } from '../controllers/contactController.js';
const contactRouter = express.Router()

contactRouter.post('/create',addContact);
contactRouter.get('/all',adminAuth,dispalyAllContacts);

export default contactRouter;