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
  const token = localStorage.getItem("token");
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
        <Route path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        <Route path="/income"
          element={
            <PrivateRoute>
              <Income />
            </PrivateRoute>
          } />
        <Route path="/expense"
          element={
            <PrivateRoute>
              <Expense />
            </PrivateRoute>
          } />
        {/* Redirect to dashboard if route not found */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      <Toaster
        toastOptions={{
          className: "toast-override",
          style: {
            fontSize: '13px'
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

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};