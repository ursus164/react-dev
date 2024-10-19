import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
// import { CartContext } from "./store/shopping-cart-context.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  

  return (
    // we use CartContext which is created by react and use .Provider component. We also need to set the default value [value = {{items : []}}]. It is only used if a component that was not wrapped by the Provider component tries to access the context value. However, we have to link the state to the context, so we will use shoppingCart variable
    <CartContextProvider>
      {/* by using component above, we could get rid off all the state management logic here, so we could have multiple context's within the app */}
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
