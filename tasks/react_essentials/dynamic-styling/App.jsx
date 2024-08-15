import React from 'react';

// don't change the Component name "App"
export default function App() {
    const [state, setState] = React.useState(null);
    
    function handleClick() {
        setState(isClicked => !isClicked)
    }
    
    return (
        <div>
            <p className={state ? 'active' : undefined}>Style me!</p>
            <button  onClick={() => handleClick()}>Toggle style</button>
        </div>
    );
}
