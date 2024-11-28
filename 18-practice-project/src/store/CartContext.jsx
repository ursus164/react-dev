// managing cart data and cart context
import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // goal of reducer function is to return an updated state
  if (action.type === "ADD_ITEM") {
    // .. update the state to add the meal item
    //state.items.push(action.item) // wrong way because we will have the array updated before the reducer function finishes its execution - unacceptable
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items]; // copy of old array

    if (existingCartItemIndex > -1) {
      // item already exists in items array -> modify quantity
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem, // existing item to modify
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // overwrite old item with the updated one

      // updating state in immutable way - without changing the existing state in memory
    } else {
      // item does not exist -> add to items array
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // ..remove item from the state
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    // item exists / possibly quantity is 1 or more
    const existingItem = updatedItems[existingCartItemIndex];
    
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }
  return state;
}

// provider function that will be wrapped around components to manage data
export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] }); // better option than useState() because it is easier to manage more complex states

  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
