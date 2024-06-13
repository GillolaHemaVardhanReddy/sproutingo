import React, { useState } from 'react'
import './OrderMenuButton.css'

const OrderMenuButton = () => {
  const items = ['Break Fast','Brown Rice Bowl','Brownrice Sandwiches' ,'Diet Packs']
  const [selectOne,setSelectOne] = useState(-1)
  const handleClick = (e) =>{
    if(selectOne===-1){
      setSelectOne(e.target.id); e.target.classList.toggle('clicked');
    }else{
      document.getElementById(selectOne).classList.toggle('clicked');
      e.target.classList.toggle('clicked');
      setSelectOne(e.target.id);
    }
  }

  return (
    <div className='order-menu-buttons'>
    {items.map((item,ind) => {
      return  <div key={ind} >
              <p id={ind} onClick={handleClick} className='order-menu-p'>{item}</p>
          </div>
 })}
    </div>
  )
}
export default OrderMenuButton