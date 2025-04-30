import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('adminToken'); // Check for admin token
    return token=='true' ? children : <Navigate to="/admin/wp-admin" />;
};

export default ProtectedRoute