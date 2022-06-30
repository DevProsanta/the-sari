import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { products } from "./config/data";
import reducer from "./reducer";


export const CarContext = createContext();

const Context = ({ children,product }) => {

    if(!product ){
      let products = product;
    } 
    const [state, dispatch] = useReducer(reducer, {
      product: products,
      cart:[],
    });
 
 
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };
  

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      state.cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [state.cart]);

  const [totalMrp, setTotalMrp] = useState();

  useEffect(() => {
    setTotalMrp(
      state.cart.reduce((acc, curr) => acc + Number(curr.mrp) * curr.qty, 0)
    );
  }, [state.cart]);

  const [disc, setDisc] = useState();

  useEffect(() => {
    setDisc(
      state.cart.reduce((acc, curr) => acc + (Number(curr.mrp) - Number(curr.price))*curr.qty , 0)
    );
  }, [state.cart]);


  return (
    <CarContext.Provider
      value={{ state, dispatch,totalMrp,disc, clearCart, removeItem, increment, decrement, total }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(CarContext);
};
