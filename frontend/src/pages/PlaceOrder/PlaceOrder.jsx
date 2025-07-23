import React, { use, useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
  const {getTotalCartAmount}=useContext(StoreContext);
  return (
   <form className='place-order'>

    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-field">
      <input type="text" placeholder='First Name'/>
      <input type="text" placeholder='Last name ' />
      </div>
    <input type="email" placeholder='Email address' />
    <input type="text" placeholder='Street'/>
    <div className="multi-field">
      <input type="text" placeholder='city'/>
      <input type="text" placeholder='state'/>
    </div>
     <div className="multi-field">
      <input type="text" placeholder='Zip Code'/>
      <input type="text" placeholder='Country'/>
    </div>
    <input type="tel" placeholder='Phone Number'/>
    </div>

    <div className="place-order-right">
       <div className="cart-total">
    <h2>Total:</h2>
          <div>
            <div className="cart-total-detail">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr/>
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount()+2}</b>
            </div>
          </div>
            <button onClick={() => navigate("/place-order")}>Proceed to Payment</button>
            </div>
            </div>
   </form>
  )
}

export default PlaceOrder