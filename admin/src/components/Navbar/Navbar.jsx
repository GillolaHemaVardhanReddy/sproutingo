import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import nav_log from '../../assets/logos/png/logo-no-background.png'
import { logOutAndClear } from '../../redux/features/auth.slice';
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    try{
      dispatch(logOutAndClear())
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='nav-container'>
        <div className='nav-left'>
            <img src={nav_log} alt='' className='nav-logo'/>
        </div>
        <div className='nav-right'>
            <p className='nav-btn' onClick={()=>navigate('/admin/manage')}>Home</p>
            <p className='nav-btn' onClick={handleLogout}>Logout</p>
        </div>
    </div>
  )
}

export default Navbar
