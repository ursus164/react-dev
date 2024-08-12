import "./App.css";
import "./styles.css";
import React from "react";
import TicketForm from "./components/TicketForm";

function App() {
  return (
    <>
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm />
      </div>
    </>
  );
}

export default App;
