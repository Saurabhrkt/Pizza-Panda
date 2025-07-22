import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
const LoginPopUp = ({setShowLoginPopUp}) => {
  const [currState , setCurrState] = useState("log in");
  return (
    <div className='log-in-pop-up'>
      <form className="log-in-pop-container">
       <div className="login-pop-title">
        <h2>{currState}</h2>
        <img onClick={()=>setShowLoginPopUp(false)} src= {assets.cross_icon} />
       </div>
        <div className="login-popup-inputs">
          {currState==="log in"?<></> :<input type="text" placeholder='Enter your name' required />}

          <input type = "email" placeholder='Enter your email' required />
          <input type="password" placeholder='Enter your password' required />
          {currState === "log in" ? <></> :<input type="password" placeholder='Confirm your password' required />}
          
        </div>
        <button className='login-pop-button' type='submit'>{currState === "sign Up" ? "create account" : "log in"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>I agree to the terms and conditions</p>
      </div>
      <div className="login-pop">
      {currState === "log in" ?
      <p>Create a new account ? <span onClick={()=>setCurrState("sign Up")}>click here</span></p> :  <p>Already have an account ? <span onClick={()=>setCurrState("log in")}> login here</span></p>}
      </div>
      </form>
    </div>
  )
}

export default LoginPopUp