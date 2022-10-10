import "./App.css";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const defaultLayout = <div>Login...</div>

  return (
    <>
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Home /> }
    </>
  );
}

export default App;
