import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {};

const cartSlice = createSlice({
    name:'cart',
    initialState: initialCartState,
    reducers: {
        // functions
    }
})

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;