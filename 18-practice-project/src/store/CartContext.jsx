// managing cart data and cart context
import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state,action) {
    // goal of reducer function is to return an updated state
    if(action.type === 'ADD_ITEM') {
        // .. update the state to add the meal item
    }

    if(action.type === "REMOVE_ITEM") {
        // ..remove item from the state
    }

    return state;
}

// provider function that will be wrapped around components to manage data
export function CartContextProvider({children}) {
    useReducer(); // better option than useState() because it is easier to manage more complex states

    return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext;