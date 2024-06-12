import React from 'react'
import { Outlet } from 'react-router-dom'
import ProductNavbar from '../components/ProductNavbar/ProductNavbar'
import SearchBar from '../components/SearchBar/SearchBar'

const ProductLayout = () => {
  return (
    <div className='products-container'>
      <ProductNavbar/>
      <SearchBar/>
      <Outlet/>
    </div>
  )
}

export default ProductLayout
