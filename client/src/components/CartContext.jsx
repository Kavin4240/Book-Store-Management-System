
import { createContext, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default CartContext;
