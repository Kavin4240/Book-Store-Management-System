import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const{id}=useParams()
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(()=>{
       axios.get(`http://localhost:3001/book/book/${id}`)
       .then(res=>{
          setName(res.data.name);
          setAuthor(res.data.author);
          setImageUrl(res.data.imageUrl);
       })
       .catch(err=> console.log(err));
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/book/book/${id}`, { name, author, imageUrl })
            .then(res => {
                if (res.data.updated) {
                    navigate('/books'); // Navigate to dashboard after book is added
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='student-form-container'>
            <form className='student-form' onSubmit={handleSubmit}>
                <h2>Edit Book</h2>
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
                <button className='btn-login' type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditBook;
