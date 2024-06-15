import React from 'react'
import {Link} from "react-router-dom"
import "./OrderNavbar.css"
import { useState } from 'react'
const OrderNavbar = () => {
    const [date,setDate] = useState("");
    const handleDate = (e)=>{
        setDate(e.target.value)
    }
  return (
    <>
    <div className='OrderNavbar'> 
    <div className='notdelivered'>
        <Link className="link" to="notdelivered">Not Delivered</Link>
    </div>
    <div className='delivered'>
        <Link className="link" to="delivered">Delivered</Link>
    </div>
    <div className='search'>
        <input type="text" value={date} placeholder="Search By Delivery Date...." onChange={handleDate}></input>
        <Link className="link" to={`delivered/${date}`}>Delivered</Link>
        <Link className="link" to={`notdelivered/${date}`}>Not Delivered</Link>
    </div>
    </div>
    </>
  )
}

export default OrderNavbar