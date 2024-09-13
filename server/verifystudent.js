// import jwt from 'jsonwebtoken';
// import { Student } from '../models/Student.js';

// export const verifyStudent = async (req, res, next) => {
//     try {
//         const token = req.cookies.token; 
//         if (!token) return res.status(401).json({ message: "Unauthorized" });

//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const student = await Student.findById(verified.id);

//         if (!student) return res.status(401).json({ message: "Unauthorized" });

//         req.student = student;
//         next();
//     } catch (err) {
//         res.status(500).json({ message: "Token verification failed" });
//     }
// };

// import jwt from 'jsonwebtoken';

// export const verifyStudent = (req, res, next) => {
//     // Extract the token from cookies
//     const token = req.cookies.authToken;  // Assuming 'authToken' is the cookie name used for the JWT

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Failed to authenticate token' });
//         }

//         req.student = decoded; 
//         next();
//     });
// };

