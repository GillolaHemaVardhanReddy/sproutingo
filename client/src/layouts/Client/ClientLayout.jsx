import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar} from '../../components/client/Navbar/Navbar'
import Footer from '../../components/client/Footer/Footer'

const MainLayOut = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
} 

export default MainLayOut