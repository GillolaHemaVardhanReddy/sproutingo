import React from 'react'
import './ProductNavbar.css'
import { Link } from 'react-router-dom'

const ProductNavbar = () => {
  return (
    <div className='product-nav-bar-container'>
      <Link to='create' className='product-create'><p>Create</p></Link>
    </div>
  )
}

export default ProductNavbar
