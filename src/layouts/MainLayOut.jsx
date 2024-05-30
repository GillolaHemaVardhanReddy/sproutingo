import React from 'react'
import { Outlet } from 'react-router-dom'
import Card from '../components/Card/Card'

const MainLayOut = () => {
  return (
    <>
      <Card/>
      <Outlet/>
    </>
  )
}

export default MainLayOut