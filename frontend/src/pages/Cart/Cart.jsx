import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
const Cart = () => {
  const { cartItem, food_list, removeFromCart } = useContext(StoreContext);
  return (
    <div className="cart">
      <div className="class-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id]) {
            return (
              <div>
                <div className="cart-items-title cart-items-item " key={index}>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${(item.price * cartItem[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr/>
              </div>
            );
          }
          return null; // Prevent "undefined" entries
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total:</h2>
          <div>
            <div className="cart-total-detail">
              <p>subtotal</p>
              <p>{0}</p>
            </div>
            <hr/>
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr/>
            <div className="cart-total-detail">
              <b>Total</b>
              <b>{0}</b>
            </div>
          </div>
            <button>Proceed To Check Out</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>
              If you have a promo code, please enter it here:
            </p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder="promo code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
