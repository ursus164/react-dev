import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import cartReducer from './cartSlice'

const store = configureStore({
    reducer : {
        // reducers
        ui: uiReducer,
        cart: cartReducer
    }
})

export default store;