import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './css/AuthLayout.css';

const AuthLayout = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  return (
    <div className='auth-container'>
      {isAuth ? <Navigate to='/admin/manage' /> : <Outlet/>}
    </div>
  );
};

export default AuthLayout;