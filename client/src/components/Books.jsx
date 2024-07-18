import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import axios from 'axios';
import '../css/Books.css';

const Books = ({role}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/book/books')
      .then(res => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='book-list'>
      {books.length > 0 ? (
        books.map(book => (
          <BookCard key={book._id} book={book}  role={role}/>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default Books;
