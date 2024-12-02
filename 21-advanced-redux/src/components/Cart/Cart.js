import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const items = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              item={{
                title: item.title,
                quantity: item.quantity,
                total: item.quantity * item.price,
                price: item.price,
                id: item.id,
              }}
              key={item.id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
