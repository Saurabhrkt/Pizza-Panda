import { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  
  // Load token from localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const addToCart = (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({...prev, [itemId]: 1}));
    } else {
      setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }
  }
  
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
  }
  
  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const foodItem = food_list.find((product) => product._id === item);
        if (foodItem) {
          total += foodItem.price * cartItem[item];
        }
      }
    }
    return total;
  }
  
  const url = "http://localhost:4000";
  
  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }
  
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;