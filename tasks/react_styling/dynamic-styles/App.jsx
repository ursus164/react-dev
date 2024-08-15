import React from 'react';

// don't change the Component name "App"
export default function App() {
    const [state, setState] = React.useState(false);
    function handleClick() {
        setState((clicked) => !clicked);
    }
    return (
        <div>
            <p style={{ color: state ? 'red' : 'white' }}>Style me!</p>
            <button onClick={handleClick}>Toggle style</button>
        </div>
        
    );
}