import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import AuthSuccess from './pages/AuthSuccess';
import ProtectedRoute from './components/ProtectedRoutes';
const App: React.FC = () => {
  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/auth-success" element={<AuthSuccess />} />
         {/* ProtectedRoute */}
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
    </BrowserRouter>
  );
};

export default App;
