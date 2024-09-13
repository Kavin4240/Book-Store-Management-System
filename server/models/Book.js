import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ename: {
        type: String,
        required: true
    },
    author: {
        type: String,  // No unique constraint
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quan: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);
export { Book };
