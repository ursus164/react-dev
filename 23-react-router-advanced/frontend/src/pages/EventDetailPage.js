import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  const event = data.event;
  console.log(event)

  return <>
  {/* <h1>Event detail page</h1>
  <p>{params.event_id}</p> */}
    <EventItem event={event} />
  </>;
}

export default EventDetailPage;
export async function loader({request,params}) {
  const response = await fetch(`http://localhost:8080/events/${params.event_id}`, {method:'delete'})

  if(!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event" }), {
      status: 500,
    });
  } else {
    return response;
  }
}

export async function action({params}) {
  const event = params.event_id;
  const response = fetch(`http://localhost:8080/events/${event}`);

  if(!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event!" }), {
      status: 500,
    });
  } else {
    return redirect('/events');
  }
}
