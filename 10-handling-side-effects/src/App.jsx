import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    // getting the user location
    navigator.geolocation.getCurrentPosition((position) => {
      // this code is a side effect, but it is not directly related to the component function.
      // Main goal of every component func is to return renderable jsx code. But this is not related with that goal
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);

      // once fetching user location finishes, it triggers a new render cycle by seting available places - the state will be updated with those sorted places, and we can pass them to second places component ==> BUT IT WILL CAUSE INFINITE LOOP without useEffect()!!!!!!!! WE FETCH USER LOCATION -> IT TRIGGERS setAvailablePlaces(...) which causes App() component to re-render, and so on. Idea behind useEffect() is that code in useEffect() will execute after every component execution.
    }); // object provided by the browser to get the current user location
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // the code below is another example of side effect, but we do not need to wrap it with useEffect() -> it will break up the rule that says we must not use useEffect() in nested element or function but only directly on root component/function.

    // There is nothing wrong with code below - it does not update any state, because it executes only when the parent function executes. It only executes when user selects and item
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      // id is not present in storedIds
      localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds])); // setting browser storage in order not to loose data when we re-execute the window or website
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
