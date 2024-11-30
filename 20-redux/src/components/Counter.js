import classes from "./Counter.module.css";
import { useSelector,useDispatch } from "react-redux";
import { counterActions } from '../store/index'

const Counter = () => {
  // using useSelector will automatically set a subscription to redux store (behind the scenes)
  const counter = useSelector(state => state.counterReducer.counter); //getting 'slice/part' of a state -> possible because component is wrapped with provider
  const show = useSelector(state => state.counterReducer.showCounter)
  const dispatch = useDispatch();

  // Without redux toolkit

  // const toggleCounterHandler = () => {
  //   dispatch({type:'toggle'});
  // };

  // const incrementHandler = () => {
  //   dispatch({type:'increment'});
  // };

  // const decrementHandler = () => {
  //   dispatch({type:'decrement'})
  // };

  // const increaseHandler = () => {
  //   dispatch({type: 'increase', amount: 5})
  // }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)) // {type : SOME_UNIQUE_ID, payload: 10} -> default redux toolkit name
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle counter</button>
    </main>
  );
};

export default Counter;
