import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'   
import { useNavigate } from 'react-router-dom' 
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
const Signup = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');  
    const [error,setError] = useState('');
    const [name,setName] = useState('');
    const [profilePic,setProfilePic] = useState(null);
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        if(!email || !password || !name) {
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
            <h3 className='text-xl font-semibold text-black'>Welcome! Create an Account</h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us by entering your details below</p>
            <form noValidate onSubmit={handleSignup} className='flex flex-col'>
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                <Input
                    label="Name :"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4"
                />
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
                    Sign Up
                </button>
            </form>
            <p className='text-xs text-slate-700 mt-4'>Already have an account? <span onClick={() => navigate('/login')} className='text-blue-500 cursor-pointer'>Login</span></p>
        </div>
    </AuthLayout>
  )
}

export default Signup
