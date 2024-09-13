// import express from 'express';
// import { Student } from '../models/Student.js';
// import bcrypt from 'bcrypt';
// import { verifyAdmin } from './auth.js';
// const router = express.Router();
// router.post('/register', verifyAdmin, async (req, res) => {
//     try {
//         const { username, roll, password, grade } = req.body;
//         const student = await Student.findOne({ username });

//         if (student) {
//             return res.json({ message: "Student is already registered" });
//         }
//         const hashPassword=await bcrypt.hash(password,10);
//         const newStudent = new Student({
//             username,
//             roll:roll,
//             password:hashPassword,
//             grade
//         });
//         await newStudent.save();
//         return res.json({ registered: true });
//     } catch (err) {
//         console.error(err);
//         return res.json({ message: "Error in registering student" });
//     }
// });
// export { router as studentRouter };

import express from 'express';
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt';
import { verifyAdmin } from './auth.js';

const router = express.Router();

// Student registration route
router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { username, roll, password, grade } = req.body;
        const student = await Student.findOne({ username });

        if (student) {
            return res.json({ message: "Student is already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            username,
            roll,
            password: hashPassword,
            grade,
            cart: [] // Initialize an empty cart
        });
        await newStudent.save();
        return res.json({ registered: true });
    } catch (err) {
        console.error(err);
        return res.json({ message: "Error in registering student" });
    }
});

// Add book to cart
router.post('/cart/add', async (req, res) => {
    try {
        const { studentId, bookId } = req.body;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.cart.push(bookId);
        await student.save();

        return res.json({ message: "Book added to cart", cart: student.cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding book to cart" });
    }
});

// View cart
router.get('/cart/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate('cart');

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.json({ cart: student.cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching cart" });
    }
});

// Remove book from cart
router.post('/cart/remove', async (req, res) => {
    try {
        const { studentId, bookId } = req.body;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.cart = student.cart.filter(id => id.toString() !== bookId);
        await student.save();

        return res.json({ message: "Book removed from cart", cart: student.cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error removing book from cart" });
    }
});

export { router as studentRouter };
