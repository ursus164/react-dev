import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  // preparation of slice of a global state
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++; // it is now allowed - redux toolkit automatically detects code that mutates the state directly and it clones under the hood our state, create a new state object, keep all the state which we are not editing, and eventually overwrite settings which we want to change/edit - but in immutable way.
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload; // muttable looking way but for the purpose above it is not muttable way of editing state :)
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;
