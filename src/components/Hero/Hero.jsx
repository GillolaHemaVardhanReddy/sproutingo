import React from 'react'
import "./Hero.css";
import arrow_icon from '../../Assets/arrow.png'
import hero_photo from '../../Assets/hero.jpg'

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-right'>
            <img src={hero_photo} alt=''/>
        </div>
        <div className='hero-left'>
            <h2>We've Got</h2>
            <div>
                <div className='hero-hand-icon'>
                    <p>Every</p>
                </div>
                <p>Healthy</p>
                <p>Food you<br/>need</p>
            </div>
            <div className='hero-latest-btn'>
                <div>Subscription</div>
                <img src={arrow_icon} alt='arrow icon'/>
            </div>
        </div> 
    </div>
  )
}
export default Hero;