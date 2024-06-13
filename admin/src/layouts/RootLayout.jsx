import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import {useSelector} from 'react-redux'
import { SetError } from '../components/ErrorMessage/ErrorMessage';


const RootLayout = () => {
  // const isAuth = localStorage.getItem('isAuth') === 'true'; // Check if user is authenticated
  const isAuth = useSelector(state=>state.auth.isAuth)
  let error1 = useSelector(state=>state.product.error)
  let error = error1.length>0 ? error1 : ''
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

  return (
    <>
      <Navbar />
      <SetError vanish={isVisible} error={error}/>
      {isAuth ? ( // If authenticated, render the child routes
        <>
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to="/admin/auth/login" /> // If not authenticated, redirect to login
      )}
    </>
  );
};

export default RootLayout;