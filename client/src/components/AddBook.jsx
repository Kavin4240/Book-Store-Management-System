// import React, { useState } from 'react';
// import axios from 'axios';
// import '../css/Login.css';
// import { useNavigate } from 'react-router-dom';

// const AddBook = () => {
//     const [name, setName] = useState('');
//     const [ename, setEname] = useState('');
//     const [author, setAuthor] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [price, setPrice] = useState('');
//     const [quan, setQuantity] = useState('');
//     const navigate = useNavigate();

//     axios.defaults.withCredentials = true;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post(`http://localhost:3001/book/add`, { name, ename, author, imageUrl, price, quan })
       
//             .then(res => {
//                 console.log(res);
//                 if (res.data.added) {
//                     navigate('/books'); 
//                 }
//             })
//             .catch(err => console.log(err));
//     };

//     return (
//         <div className='student-form-container'>
//             <form className='student-form' onSubmit={handleSubmit}>
//                 <h2>Add Book</h2>
//                 <div className='form-group'>
//                     <label htmlFor="book">Book Name:</label>
//                     <input 
//                         type="text" 
//                         id="book" 
//                         name="book" 
//                         value={name} // Bind value to state
//                         onChange={(e) => setName(e.target.value)} 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="ename">Edition Name/no:</label>
//                     <input 
//                         type="text" 
//                         id="ename" 
//                         name="ename" 
//                         value={ename} // Bind value to state
//                         onChange={(e) => setEname(e.target.value)} 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="author">Author Name:</label>
//                     <input 
//                         type="text" 
//                         id="author" 
//                         name="author" 
//                         value={author} 
//                         onChange={(e) => setAuthor(e.target.value)} 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="image">Image Url:</label>
//                     <input 
//                         type="text" 
//                         id="image" 
//                         name="image" 
//                         value={imageUrl} // Bind value to state
//                         onChange={(e) => setImageUrl(e.target.value)} 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="price">Price:</label>
//                     <input 
//                         type="number" 
//                         id="price" 
//                         name="price" 
//                         value={price} 
//                         onChange={(e) => setPrice(e.target.value)} 
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor="quan">Quantity:</label>
//                     <input 
//                         type="number" 
//                         id="quan" 
//                         name="quan" 
//                         value={quan} 
//                         onChange={(e) => setQuantity(e.target.value)} 
//                     />
//                 </div>
//                 <button className='btn-login' type="submit">Add</button>
//             </form>
//         </div>
//     );
// };

// export default AddBook;


import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [name, setName] = useState('');
    const [ename, setEname] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [quan, setQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Error state to display messages
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/book/add`, { name, ename, author, imageUrl, price, quan })
            .then(res => {
                console.log(res);
                if (res.data.added) {
                    navigate('/books'); 
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    setErrorMessage('A book with the same name, author, and edition already exists.'); // Set error message
                } else {
                    setErrorMessage('An error occurred while adding the book.');
                }
                console.log(err);
            });
    };

    return (
        <div className='student-form-container'>
            <form className='student-form' onSubmit={handleSubmit}>
                <h2>Add Book</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
                <div className='form-group'>
                    <label htmlFor="book">Book Name:</label>
                    <input 
                        type="text" 
                        id="book" 
                        name="book" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="ename">Edition no:</label>
                    <input 
                        type="text" 
                        id="ename" 
                        name="ename" 
                        value={ename} 
                        onChange={(e) => setEname(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="author">Author Name:</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="image">Image Url:</label>
                    <input 
                        type="text" 
                        id="image" 
                        name="image" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="quan">Quantity:</label>
                    <input 
                        type="number" 
                        id="quan" 
                        name="quan" 
                        value={quan} 
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                </div>
                <button className='btn-login' type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddBook;
