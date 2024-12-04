import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sendCartData,fetchCartData } from "./store/cartActions";

import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const toggleCart = useSelector((state) => state.ui.toggleCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  // useEffect will listen to changes - whether some dependencies change(state updates...), the code will run again
  useEffect(() => {
    if(isInitial) {
      isInitial=false;
      return;
    }
    dispatch(sendCartData(cart)) // we are dispatching function, that return another function. Redux toolkit is prepared for that - if it sees that we are dispatching a action that is a function not the function object. It executes that function for us.
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch])

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
