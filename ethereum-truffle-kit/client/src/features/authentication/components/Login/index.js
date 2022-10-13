import './index.css';
import {useDispatch} from 'react-redux';
import {login} from '../../authenticationSlice';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="login-btn" type="submit">
        Connect to my wallet...
      </button>
    </form>
  );
};

export default Login;
