import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apiPaths'
import  axiosInstance  from '../../utils/axiosInstance'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const { updateUser } = useContext(UserContext);                 
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            setError('Please fill in all fields');
            return;
        }
        if (!validateEmail(email)) {
            setError('Invalid email');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setError('');

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { name, email, password });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data.user);
                window.location.href = "/dashboard";
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    }
    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Welcome! Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us by entering your details below</p>
                <form noValidate onSubmit={handleSignup} className='flex flex-col'>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Input
                                label="Name :"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="w-1/2">
                            <Input
                                label="Email :"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <Input
                        label="Password :"
                        type="password"
                        placeholder="Min 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4"
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
                <p className='text-xs text-slate-700 mt-4'>Already have an account? <span onClick={() => navigate('/login')} className='text-blue-500 cursor-pointer'>Login</span></p>
            </div>
        </AuthLayout>
    )
}

export default Signup
