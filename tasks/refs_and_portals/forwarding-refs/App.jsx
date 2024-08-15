import Input from './Input';
import React from 'react';

export const userData = {
  name: '',
  email: '',
};

export function App() {
    const name = React.useRef();
    const email = React.useRef();
    
  function handleSaveData() {
    userData.name = name.current.value;
    userData.email = email.current.value;

    console.log(userData);
  }

  return (
    <div id="app">
      <Input type="text" label="Your Name" ref={name} />
      <Input type="email" label="Your E-Mail" ref={email} />
      <p id="actions">
        <button onClick={handleSaveData}>Save Data</button>
      </p>
    </div>
  );
}

