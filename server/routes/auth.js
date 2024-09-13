import express from 'express';
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (role === 'admin') {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ message: "Admin not registered" });
      }

      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.json({ message: "Wrong password" });
      }

      const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_key, { expiresIn: "5m" });
      res.cookie('token', token, { maxAge: 300000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.json({ login: true, role: "admin" });

    } else if (role === 'student') {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({ message: "Student not registered" });
      }

      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        return res.json({ message: "Wrong password" });
      }

      const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_key, { expiresIn: "5m" });
      res.cookie('token', token, { maxAge: 300000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.json({ login: true, role: "student" });

    } else {
      return res.json({ message: "Invalid role" });
    }

  } catch (error) {
    return res.json({ error: error.message });
  }
});

// Middleware for Admin Verification
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};


// Middleware for User Verification
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, adminDecoded) => {
      if (err) {
        jwt.verify(token, process.env.Student_key, (err, studentDecoded) => {
          if (err) {
            return res.json({ message: "Invalid token" });
          } else {
            req.username = studentDecoded.username;
            req.role = studentDecoded.role;
            next();
          }
        });
      } else {
        req.username = adminDecoded.username;
        req.role = adminDecoded.role;
        next();
      }
    });
  }
};

// Verify Route
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

// Logout Route
router.get("/logout", (req, res) => {
  res.clearCookie('token');
  return res.json({ logout: true });
});

// Middleware for Student Verification
const verifyStudent = async (req, res, next) => {
  const token = req.cookies.token; // or however you handle tokens

  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Use the correct environment variable
    const decoded = jwt.verify(token, process.env.Student_key); // Use Student_key for student tokens
    const student = await Student.findOne({ username: decoded.username });
    if (!student) {
      console.log('Student not found');
      return res.status(404).json({ message: 'Student not found' });
    }

    req.user = student; // Attach user to request
    console.log('Token verified, user:', req.user); // Add this line for debugging
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export { router as AdminRouter, verifyAdmin, verifyUser, verifyStudent };
