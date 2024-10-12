import { createContext } from "react";
// import { useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [], // initial value
  addItemToCart: () => {}, // dummy func for autocompletions
  updateCartItemQuantity: () => {},
}); // creates context value that can be stored in variable

// it is outside because we don't want it to be recreated when the component gets re executed
function shoppingCartReducer(state, action) {
  // func will be called by react after we dispach so called actions (shoppingCartDispatch)
  // state -> is the latest guaranteed state snapshot

  if (action.type === "ADD_ITEM") {
    // ...
    const updatedItems = [...state.items];

    // finding existing element in case user adds twice the same product - the quantity will be updated
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // not needed because we have only one value in state (but we add it not to loose any data in more complex state's)
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  // this component function will be all about managing context data and providing that data to application, and it will be all about context related to the shopping cart

  // The idea is to grab all the state management and context value management code from inside the app component and pass it here

  // we have to link the context to the state which we are managing here, because now, the context is always empty array

  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  ); // dispatch func allows to dispatch 'actions' that will be called by reducer function

  //Now we need a reducer function that will get trigered by dispatching values and will then produce new state

//   const [shoppingCart, setShoppingCart] = useState({
//     items: [],
//   });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId: productId,
        amount: amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart, // we also expose that function through context - state update function
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      {/* wrapping any other jsx code */}
      {children}
    </CartContext.Provider>
  );
}
