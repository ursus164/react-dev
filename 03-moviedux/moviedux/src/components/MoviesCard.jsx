import React from "react";
import "../style/styles.css";

export default function MoviesCard({ movie, isWatchlisted, toogleWatchlist }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingColor = (rating) => {
    if (rating >= 7) {
      return "rating-good";
    } else if (rating >= 4) {
      return "rating-ok";
    } else {
      return "rating-bad";
    }
  };

  return (
    <div key={movie.id} className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingColor(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <label className="switch">
          <input type="checkbox" checked={isWatchlisted} onChange={() => toogleWatchlist(movie.id)}></input>
          <span className="slider">
            <span className="slider-label">
              {isWatchlisted ? "In watchlist" : "Add to watchlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
