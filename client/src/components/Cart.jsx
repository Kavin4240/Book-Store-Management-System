import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cart', { withCredentials: true });
        if (Array.isArray(response.data.books)) {
          setCart(response.data.books);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError(error.message || 'Error fetching cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleBuy = async (bookId) => {
    try {
      const response = await axios.post('http://localhost:3001/cart/buy', { bookId }, { withCredentials: true });
      alert(response.data.message);
      setCart(cart.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('Error processing purchase');
    }
  };

  const handleRemove = async (bookId) => {
    try {
      const response = await axios.post('http://localhost:3001/cart/remove-from-cart', { bookId }, { withCredentials: true });
      alert(response.data.message);
      setCart(cart.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error removing book from cart:', error);
      alert('Error removing book from cart');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(book => (
            <li key={book._id}>
              <h3>{book.name}</h3>
              <p>{book.author}</p>
              <p>{book.price}</p>
              <div className="button-container">
                <button className="buy-button" onClick={() => handleBuy(book._id)}>Buy</button>
                <button className="remove-button" onClick={() => handleRemove(book._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
