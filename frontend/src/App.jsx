import React from 'react'
import {
    Routes,
    Route,
    Navigate                            
} from "react-router-dom";  
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
                {/* Redirect to dashboard if route not found */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <Toaster 
          toastOptions = {{
            className:"toast-override",
            style: {
              fontSize:'13px'
            }
          }}
        /> 
    </div>
  )
}

export default App

const Root = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;
  return <Navigate to="/dashboard" replace />;
};