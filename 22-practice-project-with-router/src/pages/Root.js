import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}
// in the outlet component we define that children routes of root route should be put
export default RootLayout;
