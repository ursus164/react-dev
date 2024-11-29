import classes from './Counter.module.css';
import { useSelector } from 'react-redux';

const Counter = () => {
  // using useSelector will automatically set a subscription to redux store (behind the scenes)
  const counter = useSelector(state => state.counter); //getting 'slice/part' of a state
  const toggleCounterHandler = () => {};

// const incrementHandler = () => {

// }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      {/* <button onClick={incrementHandler}>Increment</button> */}
      {/* <button onClick={decrementByFiveHandler}>Decrease by 5</button> */}
      {/* <button onClick={decrementHandler}>Decrement</button> */}
      <button onClick={toggleCounterHandler}>Toggle counter</button>

    </main>
  );
};

export default Counter;
