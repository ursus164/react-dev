import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialCartState = { items: [], totalQuantity: 0, totalAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload; // extra data
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        // creating our own data object which we want to store
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        }); // possible with redux toolkit because it makes sure that data (existing state) is not manipulated directly
        state.totalQuantity += 1;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity += 1;
      }
    },
    removeItem(state, action) {
      const deletedId = action.payload;
      const existingItem = state.items.find((item) => item.id === deletedId);

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity -= 1;
      } else {
        // delete item from array
        state.items = state.items.filter((item) => item.id !== deletedId);
        state.totalQuantity -= 1;
      }
    },
  },
});

//creating our own action creator - it immediately return another async function in where we dispatch actions
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data...",
      })
    ); // dispatch actual action we want to perform

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-5e291-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      ); // PUT method will overwrite the existing data instead of adding it to array (like it will be done with POST request in firebase)

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data succesfully!",
        })
      );

    } catch(error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
