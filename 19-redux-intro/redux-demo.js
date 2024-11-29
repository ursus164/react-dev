const redux = require("redux");

// state -> us current state snapshot
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer); // when store is created - redux will execute reducer function above initially (the state is undefined in the first execution)

const counterSubscriber = () => {
  const latestState = store.getState(); // method available on the store created by createStore() - it gives us the latest state snapshot after it was updated.
  console.log(latestState);
};

store.subscribe(counterSubscriber);

// dispatching action
store.dispatch({ type: "increment" });
// store.dispatch({ type: "increment" });
store.dispatch({type: 'decrement'})
