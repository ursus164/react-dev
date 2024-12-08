import { Link } from "react-router";

const EVENTS = [
  {
    id: "e1",
    title: "Event in Oklahoma",
    description: "Dancing event in Oklahoma city",
  },
  {
    id: "e2",
    title: "Music Festival in New York",
    description: "A grand music festival in Central Park",
  },
  {
    id: "e3",
    title: "Tech Conference in San Francisco",
    description: "Annual tech conference with industry leaders",
  },
  {
    id: "e4",
    title: "Art Exhibition in Paris",
    description: "Exhibition showcasing modern art",
  },
];

function EventsPage() {
  return (
    <>
      <h1>Events page</h1>
      <ul>
        {EVENTS.map(event => <li key={event.id}><Link to={event.id}>{event.title}</Link></li>)}
      </ul>
    </>
  );
}

export default EventsPage;
