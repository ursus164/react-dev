import Toast from './Toast';
import React from 'react'

function App() {
    const [enroll, setEnroll] = React.useState(false);
  function handleEnrol() {
    // Todo: Show toast
    setEnroll(true);

    setTimeout(() => {
      // Todo: hide toast
      setEnroll(false)
    }, 3000);
  }

  return (
    <div id="app">
      {/* Todo: Render <Toast /> component (conditionally) here */}
      {enroll ? <Toast message='Welcome!'/> : undefined }
      <article>
        <h2>React Course</h2>
        <p>
          A course that teaches you React from the ground up and in great depth!
        </p>
        <button onClick={handleEnrol}>Enrol</button>
      </article>
    </div>
  );
}

export default App;
