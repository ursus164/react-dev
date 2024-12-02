import classes from './CartButton.module.css';

import { useDispatch, useSelector} from 'react-redux'
import { uiActions } from '../../store/uiSlice';


const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalQuantity)

  function toggleCart() {
    dispatch(uiActions.toggle());
  }

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
