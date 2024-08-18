import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin);
  
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;