import { useLoaderData } from "react-router-dom"; // hook which gives us acces to closest loader data
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// client side code below - it executes in the browser not in the server. So we can use browser API's like localStorage, cookies etc... But we cannot use react hooks because loader function is not a react component.
export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //...
    // return { isError: true, message: "Could not fetch events..." };
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    }); // react router will render the closest error element (ErrorPage.js) -> also we will be able to get that data from inside of the components that is being rendered as an error
  } else {
    //const resData = await response.json();
    //return resData.events; // data which is returned will be available in corresponding component from router PATH e.g EventsPage. In async/await the promise is returned - but react router will take care of it and provide data from that promise automatically
    //const res = new Response() // built into the browser function that allows us to build own responses

    // The data which we get from fetch function is Reponse object which we can return instantly - the data extraction will be done automatically;
    return response;
  }
}
