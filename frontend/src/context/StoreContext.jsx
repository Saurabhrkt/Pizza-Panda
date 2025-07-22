import { createContext, useEffect, useState } from "react";
import{food_list} from '../assets/assets'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem , setCartItem] = useState({});

  const addToCart = (itemId)=>{
    if(!cartItem[itemId]){
      setCartItem((prev) => ({...prev, [itemId]: 1}));
    }
    else{
      setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }
  }

  const removeFromCart = (itemId)=>{
   setCartItem((prev)=>({...prev ,[itemId] :prev[itemId]-1}))
      }
const getTotalCartAmount = () => {
  let total = 0;
  for (const item in cartItem) {
    if (cartItem[item] > 0) {
      const foodItem = food_list.find(item => item._id === item);
      if (foodItem) {
        total += foodItem.price * cartItem[item];
      }
    }
  }
  return total;
}
  const contextValue = {
    food_list ,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart
  }
  return (
    <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
  );
}

export default StoreContextProvider;