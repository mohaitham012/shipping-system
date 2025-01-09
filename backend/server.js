import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';
import connectedCloudinary from './config/cloudinary.js';
import companyRouter from './routes/companyRouter.js';
import shippmentRouter from './routes/shippmentRouter.js';
import companyShippmentsRouter from './routes/companyShippmentsRouter.js';
import fs from 'fs';
import contactRouter from './routes/contactRouter.js';
// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
 fs.mkdirSync('uploads');
}

// App Config
const app = express();
const PORT = process.env.PORT || 4000;  // استخدم عملية التحقق من قيمة البيئة بشكل صحيح

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
connectDB();
connectedCloudinary();

// Api endpoints
app.use('/api/user', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/shippment',shippmentRouter);
app.use('/api/compShippments',companyShippmentsRouter);
app.use('/api/contact',contactRouter)

// App listener
app.get('/', (req, res) => {
  res.send('API WORKING');
});


// بدء السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// db Password: 6yPe9pYI8fN9hoFw