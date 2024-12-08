import { useLoaderData } from "react-router-dom"; // hook which gives us acces to closest loader data
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData();
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;
export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //...
  } else {
    const resData = await response.json();
    return resData.events; // data which is returned will be available in corresponding component from router PATH e.g EventsPage. In async/await the promise is returned - but react router will take care of it and provide data from that promise automatically
  }
}
