import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import AdminHome from './Admin/AdminHome';
import UserPanel from './User/UserPanel';
import Navbar from './Pages/Global/Navbar';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken'); 
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/user" element={<UserPanel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
