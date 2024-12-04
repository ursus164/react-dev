import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const toggleCart = useSelector((state) => state.ui.toggleCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  // useEffect will listen to changes - whether some dependencies change(state updates...), the code will run again
  useEffect(() => {
    const sendCartData = async () => {
  

    };

    if(isInitial) {
      isInitial=false;
      return;
    }

    sendCartData().catch((error) => {
      
    });
  }, [cart, dispatch]);

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
