import { configureStore } from '@reduxjs/toolkit'
import {uiSlice} from './uiSlice'
import {cartSlice} from './cartSlice'

const store = configureStore({
    reducer : {
        // reducers
        uiSlice,
        cartSlice
    }
})

export default store;