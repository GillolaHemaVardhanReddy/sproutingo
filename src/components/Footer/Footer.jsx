import React from 'react'
import './Footer.css'
import footer_logo from '../../Assets/Card_2_page-0001-removebg-preview.png'
import instagram_icon from '../../Assets/instagram_icon.png'
import pintester_icon from '../../Assets/pintester_icon.png'
import whatsapp_icon from '../../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo-phone'>
            <div className='footer-logo'>
                <img src={footer_logo} alt=''/>
            </div>
            <div className='footer-social-icons-phone'>
                    <div className='footer-icons-container-phone'>
                        <img src={instagram_icon} alt=''/>
                    </div>
                    <div className='footer-icons-container-phone'>
                        <img src={pintester_icon} alt=''/>
                    </div>
                    <div className='footer-icons-container-phone'>
                        <img src={whatsapp_icon} alt=''/>
                    </div>
                </div>
            </div>
        <div className='footer-links-holder'>
            <div>
                <ul className='footer-links'>
                    <p className='footer-links-heading'>Important Links</p>
                    <li>Company</li>
                    <li>Products</li>
                    <li>Offices</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className='footer-links'>
                <h2>Get to Know Us</h2>
                <h5>About Us</h5>
                <h5>Careers</h5>
                <h5>Press Releases</h5>
                <h5>Amazon Science</h5>
                <h5>Sell on LifeStyle</h5>
            </div>
            <div className='footer-social-icons'>
                <h3>Media</h3>
                <div className='footer-icons-container'>
                    <img src={instagram_icon} alt=''/>
                </div>
                <div className='footer-icons-container'>
                    <img src={pintester_icon} alt=''/>
                </div>
                <div className='footer-icons-container'>
                    <img src={whatsapp_icon} alt=''/>
                </div>
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>Copyright @2024 all rights reserved.</p>
        </div>
    </div>
  )
}
export default Footer;