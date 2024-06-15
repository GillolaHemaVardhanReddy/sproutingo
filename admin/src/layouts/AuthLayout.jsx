import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './css/AuthLayout.css';
import { useSelector } from 'react-redux';
import { SetError } from '../components/ErrorMessage/ErrorMessage';

const AuthLayout = () => {
  const {isAuth} = useSelector(state=>state.auth)
  return (<>
      <SetError/>
      <div className='auth-container'>
        {isAuth ? <Navigate to='/admin/manage' /> : <Outlet/>}
      </div>
    </>
  );
};

export default AuthLayout;