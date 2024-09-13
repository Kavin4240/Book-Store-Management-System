import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from 'axios';

const Login = ({ setRoleVar }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const res = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
                role
            });
            console.log(res);
            if (res.data.login) {
                setRoleVar(res.data.role);
                if (res.data.role === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError('Login failed! Please check your credentials.');
            }
        } catch (err) {
            console.error('Error during login request:', err);
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit}>
                <div className='login-container'>
                    <h2>Login</h2>
                    {error && <p className='error-message'>{error}</p>}
                    <div className='form-group'>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder='Enter Username' 
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Enter Password' 
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="role">Role:</label>
                        <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <button className='btn-login' type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
