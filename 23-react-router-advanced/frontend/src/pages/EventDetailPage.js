import { useParams, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const params = useParams();
  const events = useLoaderData();
  const event = events.filter(event => event.id !== params.event_id)
  return <>
  {/* <h1>Event detail page</h1>
  <p>{params.event_id}</p> */}
    <EventItem event={event}/>
  </>;
}

export default EventDetailPage;
