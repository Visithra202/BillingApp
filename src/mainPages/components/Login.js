import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({ setLogin }) {

    const navigate = useNavigate()
    const [loginFormData, setLoginFormData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginFormData({ ...loginFormData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/user-login/', loginFormData);
            // alert(res.data.message);
            setLogin(true);
            navigate('/dashboard')
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
        }
        handleReset();

    }

    const handleReset = () => {
        setLoginFormData({
            username: '',
            password: ''
        })
    }

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center bg-light'>
            <div className='bg-white  border rounded-5 shadow' style={{ width: '40%', height: '50%' }}>
                <h5 className='text-center rounded-top-5 p-2  text-light ' style={{ backgroundColor: 'rgba(61, 60, 60, 0.73)' }}>Login</h5>


                <form onSubmit={handleSubmit} className='p-3 px-5'>
                    <div className='d-flex flex-column'>
                        <label className='form-label'>Username</label>
                        <input type='text' className='form-control p-2' name='username' value={loginFormData.username}
                            onChange={handleChange} autoComplete="off" required></input>
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control p-2' name='password' value={loginFormData.password}
                            onChange={handleChange} autoComplete='off' required />
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center mt-4 '>
                        <button type='submit' className='btn btn-success rounded-pill p-1 px-4 w-25 '>Login</button>
                        <span className='form-label text-primary mt-3'>forgot password?</span>
                    </div>

                </form>
            </div>
        </div>

    )
}


// function LogoBar() {
//     return (
//         <>
//             <img src="/assets/login_logo.png" alt="Logo" />
//             <h2>Kavins Technologies</h2>
//         </>
//     );
// }


