import classes from "./Counter.module.css";
import { useSelector,useDispatch } from "react-redux";

const Counter = () => {
  // using useSelector will automatically set a subscription to redux store (behind the scenes)
  const counter = useSelector((state) => state.counter); //getting 'slice/part' of a state -> possible because component is wrapped with provider
  const show = useSelector(state => state.showCounter)
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch({type:'toggle'})
  };

  const incrementHandler = () => {
    dispatch({type:'increment'});
  };

  const decrementHandler = () => {
    dispatch({type:'decrement'})
  };

  const increaseHandler = () => {
    dispatch({type: 'increase', amount: 5})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle counter</button>
    </main>
  );
};

export default Counter;
