import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { toogleCart: false};

const uiSlice = createSlice({
    name:'ui',
    initialState: initialUiState,
    reducers: {
        // map of actions representing methods in reducer
        toogle(state) {
            state.toogleCart = !state.toogleCart;
        }
    }
})

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;