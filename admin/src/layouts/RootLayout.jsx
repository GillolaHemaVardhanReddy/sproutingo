import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
  const isAuth = localStorage.getItem('isAuth') === 'true'; // Check if user is authenticated

  return (
    <>
      <Navbar />
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