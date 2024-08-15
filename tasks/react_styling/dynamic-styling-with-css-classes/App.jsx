import React from 'react'

function App() {
    const [state, setState] = React.useState('');
    
    function handleClick(type) {
        setState(type)
    }
    
    const decision = state === '' ? '' : state === 'yes' ? 'highlight-green' : 'highlight-red';
    
  return (
    <div id="app">
      <h1 className={decision}>CSS is great!</h1>
      <menu>
        <li>
          <button onClick={() => handleClick('yes')}>Yes</button>
        </li>
        <li>
          <button onClick={() => handleClick('no')}>No</button>
        </li>
      </menu>
    </div>
  );
}

export default App;
