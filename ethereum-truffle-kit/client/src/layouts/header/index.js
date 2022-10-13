import './index.css';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/authentication/authenticationSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header>
      <nav>
        <button onClick={() => dispatch(logout())} className="logout-btn" type="submit">
          Disconnect
        </button>
      </nav>
    </header>
  );
};

export default Header;
