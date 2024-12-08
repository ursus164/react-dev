import { useEffect, useState } from "react";

function EventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/events')

      if(!response.ok) {
        setError("Fetching events failed!")
      } else {
        const resData = await response.json()
        setFetchedEvents(resData.events)
      }
      setIsLoading(false);
    }
  },[])
  return (
    <>
    </>
  );
}

export default EventsPage;
