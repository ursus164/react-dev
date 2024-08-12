import React, { useState } from "react";
import "../style/styles.css";
import MoviesCard from "./MoviesCard";

export default function MoviesGrid({ movies, watchlist, toogleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All genres");
  const [rating, setRating] = useState("All ratings");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All ratings":
        return true;
      case "Good":
        return movie.rating >= 7;
      case "Ok":
        return movie.rating >= 4 && movie.rating < 7;
      case "Bad":
        return movie.rating < 4;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      matchesGenre(movie, genre) &&
      matchesSearchTerm(movie, searchTerm) &&
      matchesRating(movie, rating)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label htmlFor="">Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenre}>
            <option>All genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label htmlFor="">Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRating}>
            <option>All ratings</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            toogleWatchlist={toogleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
