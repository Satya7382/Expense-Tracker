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

        {/* Root Route */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            token
              ? <Navigate to="/dashboard" replace />
              : <Signup />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            token
              ? <Home />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/income"
          element={
            token
              ? <Income />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/expense"
          element={
            token
              ? <Expense />
              : <Navigate to="/login" replace />
          }
        />

        {/* Invalid Routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

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

export default App;