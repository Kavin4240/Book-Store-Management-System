// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
// import Home from './components/Home';
// import Login from './components/Login';
// import Books from './components/Books';
// import Navbar from './components/Navbar';
// import Dashboard from './components/Dashboard';
// import AddStudent from './components/AddStudent';
// import { CartProvider } from './components/CartProvider';

// import Cart from './components/Cart';
// import AddBook from './components/AddBook';
// import EditBook from './components/EditBook';
// import DeleteBook from './components/DeleteBook';
// import Logout from './components/Logout';
// import { useState, useEffect } from 'react';

// function App() {
//   const [role, setRole] = useState('');
//   axios.defaults.withCredentials = true;
  
//   useEffect(() => {
//     axios.get('http://localhost:3001/auth/verify')
//       .then(res => {
//         if (res.data.login) {
//           setRole(res.data.role);
//         } else {
//           setRole('');
//         }
//         console.log(res);
//       })
//       .catch(err => console.log(err));
//   }, []);
  
//   return (
//     <CartProvider>
//             <BrowserRouter>
//                 <Navbar role={role} />
//                 <Routes>
//                     <Route path='/' element={<Home />} />
//                     <Route path='/books' element={<Books role={role} />} />
//                     <Route path='/login' element={<Login setRoleVar={setRole} />} />
//                     <Route path='/dashboard' element={<Dashboard />} />
//                     <Route path='/addstudent' element={<AddStudent />} />
//                     <Route path='/logout' element={<Logout setRole={setRole} />} />
//                     <Route path='/addbook' element={<AddBook />} />
//                     <Route path='/book/:id' element={<EditBook />} />
//                     <Route path='/delete/:id' element={<DeleteBook />} />
//                     <Route path='/cart' element={<Cart />} />
//                 </Routes>
//             </BrowserRouter>
//         </CartProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Books from './components/Books';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import { CartProvider } from './components/CartProvider';
import Cart from './components/Cart';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import Logout from './components/Logout';
import { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole('');
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error.message}</div>; // Show error state

  return (
    <CartProvider>
    
      <BrowserRouter>
        <Navbar role={role} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books role={role} />} />
          <Route path='/login' element={<Login setRoleVar={setRole} />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addstudent' element={<AddStudent />} />
          <Route path='/logout' element={<Logout setRole={setRole} />} />
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/book/:id' element={<EditBook />} />
          <Route path='/delete/:id' element={<DeleteBook />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
  );
}

export default App;

