import React from 'react'
import { Outlet } from 'react-router-dom'
import ProductNavbar from '../components/ProductNavbar/ProductNavbar'

const ProductLayout = () => {
  return (
    <div className='products-container'>
      <ProductNavbar/>
      <Outlet/>
    </div>
  )
}

export default ProductLayout
