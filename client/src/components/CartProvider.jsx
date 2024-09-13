
import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // const addToCart = (book) => {
    //     setCart((prevCart) => [...prevCart, book]);
    // };
    const addToCart = (book) => {
        setCart((prevCart) => {
            const existingBook = prevCart.find(b => b._id === book._id);
            if (existingBook) {
                return prevCart.map(b => b._id === book._id ? { ...b, quantity: b.quantity + 1 } : b);
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };
    

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(book => book._id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
