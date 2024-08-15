import React from 'react'

function App() {
    const [state, setState] = React.useState('white');
    function handleClick(type) {
        if(type === 'yes') {
          setState('green')  
        } else if(type === 'no') {
            setState('red')
        } else {
            setState('white')
        }
    }
    
    return (
    <div id="app">
      <h1 style={{
          color:state
      }}>CSS is great!</h1>
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
