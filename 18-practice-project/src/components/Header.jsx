import logo from '../assets/logo.jpg'
import Button from './ui/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { useContext } from 'react';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = cartCtx.items.reduce((totalNumber,item) => {
    return totalNumber + item.quantity
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="A restaurant" />
          <h1>REACTFOOD</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
      </header>
    </>
  );
}
