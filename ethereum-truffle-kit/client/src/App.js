import "./App.css";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Home from "./components/Home";
import { hasLoggedIn } from "./components/Auth/auth-slice";

function App() {
  const isLoggedIn = useSelector(hasLoggedIn);

  return (
    <>
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Home /> }
    </>
  );
}

export default App;
