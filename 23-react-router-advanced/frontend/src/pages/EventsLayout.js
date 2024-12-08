import { Outlet } from "react-router";
import EventsNavigation from "../components/EventsNavigation";

function EventsLayout() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default EventsLayout;
