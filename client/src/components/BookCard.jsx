// import React from 'react';
// import { Link } from 'react-router-dom';

// const BookCard=({book, role})=>{
//     const {name,author,imageUrl}=book;
//     return (
//         <div className='book-card'>
//           <img src={imageUrl} alt={name} className='book-image' />
//           <div className='book-details'>
//             <h3>{name}</h3>
//             <p>{author}</p>
//           </div>
//           {role==="admin" &&
//           <div className='book-actions'>
//             <button><Link to={`/book/${book._id}`} className='btn-link'>edit</Link></button>
//             <button><Link to={`/delete/${book._id}`} className='btn-link'>delete</Link></button>
//           </div>}
//         </div>
//     )
// }
// export default BookCard


// import React from 'react';
// import { useCart } from './CartContext';

// const BookCard = ({ book }) => {
//     const { addToCart } = useCart();

//     const handleAddToCart = () => {
//         addToCart(book);
//     };

//     return (
//         <div className="book-card">
//             <h3>{book.name}</h3>
//             <p>{book.author}</p>
//             <img src={book.imageUrl} alt={book.name} style={{ maxinline-size: '100px', block-size: 'auto' }} />
//             <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };

// export default BookCard;

//Need to improve
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from './CartContext';

// const BookCard = ({ book, role }) => {
//     const { name, author, imageUrl, price, quan } = book;
//     const { addToCart } = useCart();
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleAddToCart = () => {
//         addToCart(book);
//         navigate('/cart'); // Redirect to the cart page
//     };

//     return (
//         <div className='book-card'>
//             <img src={imageUrl} alt={name} className='book-image' />
//             <div className='book-details'>
//                 <h3>{name}</h3>
//                 <p>{author}</p>
//                 <p>{price}</p>
//                 <p>{quan}</p>
//             </div>
//             {role === "admin" && (
//                 <div className='book-actions'>
//                     <button><Link to={`/book/${book._id}`} className='btn-link'>Edit</Link></button>
//                     <button><Link to={`/delete/${book._id}`} className='btn-link'>Delete</Link></button>
//                 </div>
//             )}
//             {role === "student" && (
//                 <button onClick={handleAddToCart} id="btn" className='btn-link'>Add to Cart</button>
//             )}
//         </div>
//     );
// }

// export default BookCard;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ book, role }) => {
  const { name, author, imageUrl, price, quan } = book;
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:3001/cart/add-to-cart', 
        { bookId: book._id },
        { withCredentials: true } // Ensure credentials (cookies) are sent
      );

      if (response.status === 200) {
        navigate('/cart');
      } else {
        console.error('Failed to add book to cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };

  return (
    <div className='book-card'>
      <img src={imageUrl} alt={name} className='book-image' />
      <div className='book-details'>
        <h3>{name}</h3>
        <p>{author}</p>
        <p>{price}</p>
        <p>{quan}</p>
      </div>
      {role === "admin" && (
                 <div className='book-actions'>
                     <button><Link to={`/book/${book._id}`} className='btn-link'>Edit</Link></button>
                    <button><Link to={`/delete/${book._id}`} className='btn-link'>Delete</Link></button>
                 </div>             )}
      {role === "student" && (
        <button onClick={handleAddToCart} className='btn-link'>Add to Cart</button>
      )}
    </div>
  );
};

export default BookCard;




