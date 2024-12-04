import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const toggleCart = useSelector(state => state.ui.toggleCart);
  const cart = useSelector(state => state.cart);
  
  // useEffect will listen to changes - whether some dependencies change(state updates...), the code will run again
  useEffect(() => {
    fetch('https://react-redux-5e291-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {method: 'PUT',
      body: JSON.stringify(cart)
    }) // PUT method will overwrite the existing data instead of adding it to array (like it will be done with POST request in firebase)
  },[cart])
  

  return (
    <Layout>
      {toggleCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
