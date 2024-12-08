import { useParams, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const params = useParams();

  return <>
  {/* <h1>Event detail page</h1>
  <p>{params.event_id}</p> */}
    {/* <EventItem /> */}
  </>;
}

export default EventDetailPage;
