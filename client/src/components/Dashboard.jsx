import React, { useEffect ,useState} from 'react';
import '../css/Dashboard.css';
import axios from 'axios';

const Dashboard=()=>{
    const[students,SetStudents]=useState(0)
    const[admin,SetAdmin]=useState(0)
    const[books,SetBooks]=useState(0)

    useEffect(()=>{
       axios.get('http://localhost:3001/dashboard')
       .then(res =>{
        SetStudents(res.data.student);
        SetAdmin(res.data.admin);
        SetBooks(res.data.book);
       })
       .catch(err => console.log(err));
    }, [])
    return (
        <div className='dashboard'>
            <div className='dashboard-box'>
                <h2>Total Books</h2><br/>
                <h2>{books}</h2>
            </div>
            <div className='dashboard-box'>
                <h2>Total Students</h2> <br/>
                <h2>{students}</h2>
            </div>
            <div className='dashboard-box'>
                <h2>Total Admins</h2> <br/>
                <h2>{admin}</h2>
            </div>
           
        </div>
    )
}
export default Dashboard