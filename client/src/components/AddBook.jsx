import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/book/add`, { name, author, imageUrl })
       
            .then(res => {
                console.log(res);
                if (res.data.added) {
                    navigate('/books'); 
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='student-form-container'>
            <form className='student-form' onSubmit={handleSubmit}>
                <h2>Add Book</h2>
                <div className='form-group'>
                    <label htmlFor="book">Book Name:</label>
                    <input 
                        type="text" 
                        id="book" 
                        name="book" 
                        value={name} // Bind value to state
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="author">Author Name:</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author" 
                        value={author} // Bind value to state
                        onChange={(e) => setAuthor(e.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="image">Image Url:</label>
                    <input 
                        type="text" 
                        id="image" 
                        name="image" 
                        value={imageUrl} // Bind value to state
                        onChange={(e) => setImageUrl(e.target.value)} 
                    />
                </div>
                <button className='btn-login' type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddBook;
