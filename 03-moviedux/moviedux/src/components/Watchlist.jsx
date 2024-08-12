import React from "react";
import "../style/styles.css";
import MoviesCard from "./MoviesCard";

export default function Watchlist({ movies, watchlist, toogleWatchlist }) {
  return (
    <div>
      <h1 className="title">Your watchlist</h1>
      <div className="watchlist">
        {watchlist.map((id) => {
          const movie = movies.find((movie) => movie.id === id);
          return (
            <MoviesCard
              key={id}
              movie={movie}
              toogleWatchlist={toogleWatchlist}
              isWatchlisted={true}
            />
          );
        })}
      </div>
    </div>
  );
}
