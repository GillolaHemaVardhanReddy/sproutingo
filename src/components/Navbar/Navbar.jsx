import { useRef } from "react"
import logo from "../../Assets/Card_2_page-0001-removebg-preview.png"
import "./Navbar.css"
import { FaTimes,FaBars } from "react-icons/fa"
export const Navbar = ()=>{
    const navRef = useRef();
    const showNavbar = ()=>{
        navRef.current.classList.toggle("responsive_navbar");
    }
   return ( <div>
        <div className="navbar">
            <div className="last">
                <FaBars className="nav-btn open-nav-btn" onClick={showNavbar} />
            </div>
            <div className="left">
                <img src={logo} alt="" />
            </div>
            <div className="middle" ref={navRef}>
                <div className="text">
                    Home
                </div>
                <div className="text">
                    Menu
                </div>
                <div className="text">
                    Subscriptions
                </div>
                <div className="text">
                    About
                </div>
                <FaTimes className="nav-btn nav-close-btn" onClick={showNavbar}/>
            </div>
            <div className="right">
                <div className="person text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    <div className="text">Login</div>
                </div>
                <div className="cart text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-bag-heart" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
   )
}