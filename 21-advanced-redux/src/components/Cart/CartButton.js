import classes from './CartButton.module.css';

import { useDispatch} from 'react-redux'
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {

  const dispatch = useDispatch();

  function toggleCart() {
    dispatch(uiActions.toggle());
  }

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
