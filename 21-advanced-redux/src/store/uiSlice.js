import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { toggleCart: false, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    // map of actions representing methods in reducer
    toggle(state) {
      state.toggleCart = !state.toggleCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status, // pending, waiting etc...
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
