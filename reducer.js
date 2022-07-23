
const reducer = (state, action) => {
  
  if(action.type === "ADD_TO_CART"){
    return { ...state, cart: [...state?.cart, { ...action.payload, qty: 1 }] };
  }
   
    if (action.type === "CLEAR_CART") {
      return { ...state, cart: [] };
    }
  
    if (action.type === "REMOVE_ITEM") {
      return {
        ...state,
        cart: state?.cart?.filter((curElem) => {
          return curElem.id !== action.payload;
        }),
      };
    }
  
    if (action.type === "INCREMENT") {
      //   we need to find out which item is clicked
      let updatedCart = state?.cart?.map((curElem) => {
        if (curElem.id === action.payload) {
          return { ...curElem, qty: curElem.qty + 1 };
        }
        return curElem;
      });
      return { ...state, cart: updatedCart };
    }
  
    if (action.type === "DECREMENT") {
      //   we need to find out which item is clicked
      let updatedCart = state?.cart?.map((curElem) => {
          if (curElem.id === action.payload) {
            return { ...curElem, qty: curElem.qty - 1 };
          }
          return curElem;
        }).filter((curElem) => curElem.qty !== 0);
      return { ...state, cart: updatedCart };
    }
  
    return state;
  };
  
  export default reducer;