import React from 'react';

// IMPORTANT:
// In this Udemy environment, you CAN'T import & use useState like this:
// import { useState } from 'react'
// Instead, import & use it like this:
// import React from 'react';
// React.useState(...)

// don't change the Component name "App"
export default function App() {
    const [state, setState] = React.useState(null)    
    
    let content = <button onClick={() => handleClick('delete')}>Delete</button>;
    
    if(state == 'delete') {
        content = 
        <div data-testid="alert" id="alert">
          <h2>Are you sure?</h2>
          <p>These changes can't be reverted!</p>
          <button onClick={() => handleClick('proceed')}>Proceed</button>
        </div>
    }
    
    if(state == 'proceed') {
        content = <button onClick={() => handleClick('delete')}>Delete</button>;
    }
    
    
    function handleClick(type) {
        setState(type);
    }
    
    return (
      <div>
        {content}
      </div>    
    );
}