import './App.css';
import {useSelector} from 'react-redux';
import Auth from './features/Auth';
import Home from './layouts/home';
import {hasLoggedIn} from './features/Auth/auth-slice';

function App() {
  const isLoggedIn = useSelector(hasLoggedIn);

  return (
    <>
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Home />}
    </>
  );
}

export default App;
