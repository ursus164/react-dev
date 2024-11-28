// managing cart data and cart context
import { createContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

// provider function that will be wrapped around components to manage data
export function CartContextProvider({children}) {
    return <CartContext.Provider>{children}</CartContext.Provider>
}

export default CartContext;