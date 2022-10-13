import './App.css';
import {useSelector} from 'react-redux';
import Login from './features/authentication/components/Login';
import Home from './layouts/home';
import {hasLoggedIn} from './features/authentication/authenticationSlice';

function App() {
  const isLoggedIn = useSelector(hasLoggedIn);

  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Home />}
    </>
  );
}

export default App;
