import React from 'react'
import './Navbar.css'
import nav_log from '../../assets/logos/png/logo-no-background.png'

const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='nav-left'>
            <img src={nav_log} alt='' className='nav-logo'/>
        </div>
        <div className='nav-right'>
            
        </div>
    </div>
  )
}

export default Navbar
