import { useState } from "react";
import React from "react";

export default function TicketForm() {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [priority, setPriority] = useState("1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescr("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="text"
          value={descr}
          className="form-input"
          onChange={(e) => setDescr(e.target.value)}></textarea>
      </div>
      field
    </form>
  );
}
