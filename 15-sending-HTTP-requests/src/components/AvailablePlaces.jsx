import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  // Fetch data
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // when dependencies of useEffect does not change, the useEffect function only executes once after the component function executed for the first time. But then useEffect function won't execute again so we will not enter into infinite loop
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true)
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places); // array of places
      setIsFetching(false)
    }

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      isLoading={isFetching}
      loadingText='Loading data...'
      onSelectPlace={onSelectPlace}
    />
  );
}
