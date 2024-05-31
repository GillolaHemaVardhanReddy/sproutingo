import React from 'react'
import './CustomerServices.css'
import ServiceCard from '../ServiceCard/ServiceCard'
const CustomerServices = () => {
  return (
    <div className='service-main'>
      <p className='service-heading'>Services We Provide</p><hr className='service-underline'/>
      <div className='services-holder'>
        <ServiceCard/>
        <ServiceCard/>
        <ServiceCard/>
      </div>
    </div>
  )
}

export default CustomerServices
