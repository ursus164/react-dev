import { useContext } from "react";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./ui/Input";
import Button from "./ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    totalPrice += item.quantity * item.price;
    return totalPrice;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData(); // clear data provided by custom hook (success modal)
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // {email: test@example.com}

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if(isSending) {
    actions = <span>Sending order data...</span>
  }

  if(data && !error) {
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order was submitted succesfully.</p>
        <p>We will get to you with more details within the next few minutes.</p>
        <p className="modal-actions"><Button onClick={handleFinish}>Okay</Button></p>

    </Modal>
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="text" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title='Failed to submit order' message={error}/>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
