import "../style/styles.css";
import "../style/App.css";
import Header from "./Header";
import Footer from "./Footer";
import MoviesGrid from "./MoviesGrid";
import Watchlist from "./Watchlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const toogleWatchlist = (movieId) => {
    setWatchlist((prevList) =>
      prevList.includes(movieId)
        ? prevList.filter((id) => id !== movieId)
        : [...prevList, movieId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toogleWatchlist={toogleWatchlist}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  movies={movies}
                  watchlist={watchlist}
                  toogleWatchlist={toogleWatchlist}
                />
              }
            />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
