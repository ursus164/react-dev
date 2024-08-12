import React from "react";
import "../style/styles.css";

export default function Header() {
  return (
    <div className="Header">
      <img className="logo" src="logo.png" alt="movieduck" />
      <h2 className="app-subtitle">
        It's time for popcorn! Find your next movie here.
      </h2>
    </div>
  );
}
