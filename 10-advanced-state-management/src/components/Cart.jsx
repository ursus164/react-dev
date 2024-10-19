import { useContext } from "react"; // allows to access the context value
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  const { items, updateCartItemQuantity } = useContext(CartContext); // when we access context value in a component, and that value then changes - the component function that accesses that value, will get re-executed by react just as the component function would also get re-executed if we would be using some internal state that was updated or its parent compoent was executed again.
  const totalPrice = items.reduce(
    // we are reducing the complex value - array of numbers into single value
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
