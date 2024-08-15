// IMPORTANT: You CAN'T import & use useState like this in this Udemy environment
// import { useState } from 'react'
// Instead, import & use it like this:
import React from 'react';
// React.useState();

export default function App() {
    const [currentPrice, setCurrentPrice] = React.useState("$100");
    function addDiscount() {
        setCurrentPrice("$75")
    }
    return (
        <div>
            <p data-testid="price">{currentPrice}</p>
            <button onClick={() => addDiscount()}>Apply Discount</button>
        </div>
    );
}