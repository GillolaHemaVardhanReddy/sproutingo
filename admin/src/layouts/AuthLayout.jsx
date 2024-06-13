import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './css/AuthLayout.css';
import { useSelector } from 'react-redux';
import { SetError } from '../components/ErrorMessage/ErrorMessage';

const AuthLayout = () => {
  const {isAuth,error} = useSelector(state=>state.auth)
  let errorMsg = error.length>0 ? error : '';
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (error.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);
  return (<>
      <SetError vanish={isVisible} error={errorMsg}/>
      <div className='auth-container'>
        {isAuth ? <Navigate to='/admin/manage' /> : <Outlet/>}
      </div>
    </>
  );
};

export default AuthLayout;