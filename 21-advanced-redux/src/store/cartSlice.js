import { createSlice } from "@reduxjs/toolkit";

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
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem;
      }
    },
    removeItem(state, action) {
      const deletedId = action.payload;
      const existingItem = state.items.find((item) => item.id === deletedId);

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      if (existingItem.quantity === 1) {
        // delete item from array
        state.items = state.items.filter((item) => item.id !== deletedId);
      }
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
