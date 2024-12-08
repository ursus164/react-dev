import { useParams, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useLoaderData();
  const event = data.event;

  return <>
  {/* <h1>Event detail page</h1>
  <p>{params.event_id}</p> */}
    <EventItem event={event} />
  </>;
}

export default EventDetailPage;
export async function loader({request,params}) {
  const response = await fetch(`http://localhost:8080/events/${params.event_id}`)

  if(!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event" }), {
      status: 500,
    });
  } else {
    return response;
  }

}
