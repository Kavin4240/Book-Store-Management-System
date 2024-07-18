import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [roll, setRoll] = useState('');
    const [username, setUsername] = useState('');
    const [grade, setGrade] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // setError(''); 

        axios.post(`http://localhost:3001/student/register`, { roll, username, grade, password })
            .then(res => {
                console.log("Server response:", res);
                if (res.data.registered) {
                    navigate('/dashboard');
                }
                // } else {
                //     setError(res.data.message || 'Registration failed!');
                // }
            })
            .catch(err => console.log(error));
            // {
                // console.error('Error during registration request:', err);
                // setError(err.response?.data?.message || 'An error occurred');
            // });
    };

    return (
        <div className='student-form-container'>
            <form className='student-form' onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                {/* {error && <p className='error-message'>{error}</p>} */}
                <div className='form-group'>
                    <label htmlFor="roll">Roll No:</label>
                    <input 
                        type="text" 
                        id="roll" 
                        name="roll" 
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)} 
                        autoComplete="roll"
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        autoComplete="username"
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="grade">Grade:</label>
                    <input 
                        type="text" 
                        id="grade" 
                        name="grade" 
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)} 
                        autoComplete="off"
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete="current-password"
                    />
                </div>
                <button className='btn-login' type="submit">Register</button>
            </form>
        </div>
    );
};

export default AddStudent;
