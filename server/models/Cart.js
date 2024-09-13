// models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export { Cart };
