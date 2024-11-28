import Header from "./components/header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
