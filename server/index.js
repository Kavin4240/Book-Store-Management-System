import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import './db.js'; 
import { Admin } from './models/Admin.js';
import { Student } from './models/Student.js';
import {Book} from './models/Book.js';
import {AdminRouter} from './routes/auth.js'
import { studentRouter } from './routes/student.js';
import { bookRouter } from './routes/book.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://127.0.0.1:5173','http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());

//routes
app.use('/auth',AdminRouter);
app.use('/student', studentRouter);
app.use('/book', bookRouter);


app.get('/dashboard',async(req,res)=>{
   try{
     const student=await Student.countDocuments();
     const admin=await Admin.countDocuments();
     const book=await Book.countDocuments();
     return res.json({ok:true,student,book,admin})
   }catch(err){
    console.log(err)
   }
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
