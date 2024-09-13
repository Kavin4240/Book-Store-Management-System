import express from 'express';
import {Book} from '../models/Book.js';
import { verifyAdmin } from './auth.js';
const router=express.Router();

// router.post('/add',verifyAdmin,async(req,res)=>{
//     try{
//          const {name,ename, author,imageUrl,price,quan}=req.body;
//          const newbook=new Book({
//             name,
//             ename,
//             author,
//             imageUrl,
//             price,
//             quan
//          })
//          await newbook.save()
        
//          return res.json({added:true})
//     }catch(err){
//         return res.json({message:"Error in adding book"})
//     }
// })

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, ename, author, imageUrl, price, quan } = req.body;

        // Create the new book object
        const newBook = new Book({
            name,
            ename,
            author,
            imageUrl,
            price,
            quan
        });

        // Save the new book
        await newBook.save();

        return res.status(201).json({ added: true });
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate key error (MongoDB error code 11000)
            return res.status(409).json({ message: 'A book with the same name, author, and edition already exists.' });
        }

        // Log the error for debugging purposes
        console.error(err);

        // Handle other errors
        return res.status(500).json({ message: 'Error in adding book', error: err.message });
    }
});


router.get('/books',async (req,res) =>{
    try{
       const books=await Book.find()
       return res.json(books)
    }catch(err){
        return res.json(err)
    }
})

router.get('/book/:id',async (req,res) =>{
    console.log("njfkhfv")
    try{
       const id=req.params.id;
       const books=await Book.findById({_id:id});
       return res.json(books)
    }catch(err){
        return res.json(err)
    }
})
router.put('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Log incoming request body
        console.log("Incoming request body:", req.body);

        // Update the book without checking for unique authors
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found." });
        }

        // Return the updated book
        return res.status(200).json({ updated: true, book: updatedBook });
    } catch (err) {
        console.error("Error during update process:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
});


router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({ _id: id });
        return res.status(200).json({ deleted: true, book });
    } catch (err) {
        return res.status(500).json(err);
    }
});

export {router as bookRouter}