import { Outlet, useNavigation } from "react-router-dom";
// react router useNavigation hook is for finding out the status of data fetching / transition etc...
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' &&<p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
