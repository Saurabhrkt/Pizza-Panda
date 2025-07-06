import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer' >
      <div className="footer-content">
        <div className="footer-content-left">
      <img src={assets.logo} alt=""/>
      <p>Pizza Panda</p>
      <div className="footer-social-icon">
        <img src={assets.facebook_icon} alt="Facebook" />
        <img src={assets.linkedin_icon} alt="LinkedIn" />
        <img src={assets.twitter_icon} alt="Twitter" />
      </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
          <li>Phone: +1 234 567 890</li>
          <li>Email: info@pizzapanda.com</li>
        </ul>
        </div>
      </div>
     <hr />
     <p className='footer-copyright'>© 2025 Pizza Panda. All rights reserved.</p>
    </div>
  )
}

export default Footer