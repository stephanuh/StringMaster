import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // User is not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }
    return children;
};
export default PrivateRoute;