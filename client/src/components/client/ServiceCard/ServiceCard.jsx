import React from 'react'
import './ServiceCard.css'

const ServiceCard = () => {
  return (
    <div className='service-card'>
        <div className='service-card-left'>
            <div className="service-card-left-top">
                <h1 className='service-card-heading'>Order <br/>Food</h1>
                </div>
            <div className='service-card-left-bottom'>
                <p>Order Now</p>
                </div>
        </div>
        <div className='service-card-right'>
            <img 
            src='https://static.wixstatic.com/media/adb73b_f7ad77f39ec747258171d3b5199093b2~mv2.png/v1/crop/x_85,y_71,w_344,h_343/fill/w_295,h_295,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Oat_Meal_90_-removebg-preview.png'
            alt=''
            className='service-card-image'
                />
        </div>
        </div>
  )
}

export default ServiceCard
