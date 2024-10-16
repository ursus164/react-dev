import React, { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces, fetchUserPlaces } from "./http.js";
import ErrorPage from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  function handleStartRemovePlace(place) {
    // getting the selected place
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // data is fetched when the component is rendered for the first time
  useEffect(() => {
    async function fetchUserPlacesData() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setErrorUpdatingPlaces({
          message: error.message || "Failed to load user places!",
        });
      }
      setIsFetching(false);
    }
    fetchUserPlacesData();
  }, []);

  // sending updated array to the backend
  async function handleSelectPlace(selectedPlace) {
    // await updateUserPlaces([...userPlaces, selectedPlace]); --> Alternative, however the rest of the code will wait for that part to finish

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces; // if we click again on the same place
      }
      return [selectedPlace, ...prevPickedPlaces]; // adding new place to state
    });
    /// OPTIMISTIC UPDATING --> we are updating the UI first, and then under the hood the request to the backend is being sent. It provides better user experience than showing loading spinner or loading text. However it is not always possible.
    try {
      await updateUserPlaces([...userPlaces, selectedPlace]); // that won't work -> the state update won't immediately be available in the next line of code. It will only be available after the component function executes for the next time --> AWAIT kind of stops the app, waits before we continue with the next steps
    } catch (error) {
      setUserPlaces(userPlaces); // backup to the old user places when error occurs with adding a new one. We rollback the change and we update the UI again.
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places",
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces); //rollback changes when error occured
        setErrorUpdatingPlaces({
          message: error.message || "Failed to delete place",
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  ); // adding dependency in order to make sure that this whole function is recreated if the user places state changes which is crucial to ensure that we are sending the right updated places to the backend

  function handleError() {
    setErrorUpdatingPlaces(null); // we have to clear the error state in order to close the modal
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title={"An error occured!"}
            message={errorUpdatingPlaces.message} // errorUpdatingPlaces must be thruthy, to not crash the app, therefore we wrap it. Even though the Error component will only be visible if the modal is visible BUT it will actually be part of the DOM right away, because the modal component is always part of the DOM - it is not always open but it is a part of it
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occured"
            message={errorUpdatingPlaces.message}
          />
        )}
        {!errorUpdatingPlaces && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            isLoading={isFetching}
            loadingText={"Loading your places..."}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
