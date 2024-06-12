import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './css/AuthLayout.css';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const isAuth = useSelector(state=>state.auth.isAuth)
  return (
    <div className='auth-container'>
      {isAuth ? <Navigate to='/admin/manage' /> : <Outlet/>}
    </div>
  );
};

export default AuthLayout;