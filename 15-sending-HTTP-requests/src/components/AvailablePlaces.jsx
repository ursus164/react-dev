import React, { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // States common to use together when fetching data
  const [availablePlaces, setAvailablePlaces] = useState([]); // Fetch data
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  // when dependencies of useEffect does not change, the useEffect function only executes once after the component function executed for the first time. But then useEffect function won't execute again so we will not enter into infinite loop
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces); // array of places
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message: error.message || "Could not fetch places, try again later.",
        });
        setIsFetching(false);
      }

      // setIsFetching(false); we have to change that place, because we are sorting places by distane above - we are using callback function, and not async / await. Setting state to false here, will set it to false to early. Javascript will not wait for the callback function to finish and will execute the further code
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title={"An error occured"} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      isLoading={isFetching}
      loadingText="Loading data..."
      onSelectPlace={onSelectPlace}
    />
  );
}
