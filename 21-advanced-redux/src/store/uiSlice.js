import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { toggleCart: false};

const uiSlice = createSlice({
    name:'ui',
    initialState: initialUiState,
    reducers: {
        // map of actions representing methods in reducer
        toggle(state) {
            state.toggleCart = !state.toggleCart;
        }
    }
})

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;