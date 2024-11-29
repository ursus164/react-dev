import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  // preparation of slice of a global state
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++; // it is now allowed - redux toolkit automatically detects code that mutates the state directly and it clones under the hood our state, create a new state object, keep all the state which we are not editing, and eventually overwrite settings which we want to change/edit - but in immutable way.
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.amount; // muttable looking way but for the purpose above it is not muttable way of editing state :)
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     // state should always be overwritten - we must not mutate the existing state!!!
//     // e.g state.counter++; ----> Absolutely NOT the way
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter, // the state objects are not merged, but overwritten - so we have to set all fields/values/states etc...
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "increase") {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       showCounter: !state.showCounter,
//       counter: state.counter,
//     };
//   }

//   return state;
// };

const store = configureStore({ reducer: { counter: counterSlice.reducer } });
// only one reducer is available for store, therefore instead of using standard redux combineReducers method, we will use recommended methods from redux/toolkit. Redux wants one main reducer function which is responsible for global state - but what if we have multiple state slices with single reducer function per slice? We could set the 'reducer:' value for the object and add multiple reducers - it will be like MAP of reducers. However with configure store the value for reducer can be a s

export default store;
