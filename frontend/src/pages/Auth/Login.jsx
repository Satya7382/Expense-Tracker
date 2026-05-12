import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'   
import { useNavigate } from 'react-router-dom' 
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');  
    const [error,setError] = useState('');

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if(!validateEmail(email)) {
            setError('Invalid email');
            return;
        }
        if(password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setError('');
    }
  return (
    <AuthLayout>
        <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
            <h3 className='text-xl font-semibold text-black'>Welcome Back!</h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your credentials to access your account</p>
            <form noValidate onSubmit={handleLogin}>
                <Input
                    label="Email :"
                    type="email"
                    placeholder="jhon@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                />
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
                    Login
                </button>
            </form>
            <p className='text-xs text-slate-700 mt-4'>Don't have an account? <span onClick={() => navigate('/signup')} className='text-blue-500 cursor-pointer'>Sign Up</span></p>
        </div>
    </AuthLayout>
  )
}

export default Login
