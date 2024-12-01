import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    counterReducer: counterReducer,
    authReducer: authReducer,
  },
});
// only one reducer is available for store, therefore instead of using standard redux combineReducers method, we will use recommended methods from redux/toolkit. Redux wants one main reducer function which is responsible for global state - but what if we have multiple state slices with single reducer function per slice? We could set the 'reducer:' value for the object and add multiple reducers - it will be like MAP of reducers. However with configure store the value for reducer can be a s

export default store;
