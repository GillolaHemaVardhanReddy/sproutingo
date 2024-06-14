import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import nav_log from '../../assets/logos/png/logo-no-background.png'
import { logOutAndClear, logoutStart, logoutSuccess } from '../../redux/features/auth.slice';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { clearState } from '../../redux/features/product.slice'
import { analyticsProductClear } from '../../redux/features/analytics.slice';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(logoutStart())
    try{
      dispatch(logOutAndClear())
      // const resp = axios('/auth/signout')
      // console.log(resp)
      // dispatch(logoutSuccess())
      // dispatch(clearState())
      // dispatch(analyticsProductClear())
      // navigate('/admin/auth')
    }catch(err){
      console.log(err)
    }
    // localStorage.removeItem('isAuth')
  }
  return (
    <div className='nav-container'>
        <div className='nav-left'>
            <img src={nav_log} alt='' className='nav-logo'/>
        </div>
        <div className='nav-right'>
            <p className='nav-btn'>Home</p>
            <p className='nav-btn' onClick={handleLogout}>Logout</p>
        </div>
    </div>
  )
}

export default Navbar
