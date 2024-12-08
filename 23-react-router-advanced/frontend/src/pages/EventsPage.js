import { useLoaderData } from "react-router-dom"; // hook which gives us acces to closest loader data
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData();
  return (
    <>
     <EventsList events={events}/>
    </>
  );
}

export default EventsPage;
