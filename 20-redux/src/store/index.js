import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    // state should always be overwritten - we must not mutate the existing state!!!
    // e.g state.counter++; ----> Absolutely NOT the way
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter, // the state objects are not merged, but overwritten - so we have to set all fields/values/states etc...
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};

const store = createStore(counterReducer);

// const counterSubscriber = () => {
//   const latestState = store.getState();
// };

// store.subscribe(counterSubscriber);
// store.dispatch({ type: "increment" });
// store.dispatch({ type: "decrement" });

export default store;
