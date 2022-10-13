import './index.css';
import logo from './logo.svg';
import Header from '../header/index';
import DummyAsyncData from '../../features/dummy-async-data';
import ModalDialog from '../../features/dummy-async-data/components/ModalDialog';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {openModal} from '../../features/dummy-async-data/components/ModalDialog/redux-slice';
import {fetchAsyncDataWithFetch} from '../../features/dummy-async-data/dummyThunkSliceForFetch';
import {fetchAsyncDataWithAxios} from '../../features/dummy-async-data/dummyThunkSliceForAxios';

const Home = () => {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.modal);
  const {data: asyncDataFromFetch} = useSelector(state => state.dummyAsyncDataFromFetch);
  const {data: asyncDataFromAxios} = useSelector(state => state.dummyAsyncDataFromAxios);

  useEffect(() => {
    dispatch(fetchAsyncDataWithFetch());
    dispatch(fetchAsyncDataWithAxios());
  }, []);

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Start writing code...</p>
        <a
          className="App-link"
          href="https://github.com/govindthange/dapp-studio"
          target="_blank"
          rel="noopener noreferrer">
          Ethereum DApp Studio
        </a>

        <h1>Dummy async. data from fetch() API</h1>
        {asyncDataFromFetch.map((item, idx) => {
          // 'key' in child components help react identify which items have changed/added/removed.
          return (
            <div key={idx}>
              {item.id}. {item.title} ({item.price})
            </div>
          );
        })}

        <h1>Dummy async. data from axios() API</h1>
        {asyncDataFromAxios.map((item, idx) => {
          // 'key' in child components help react identify which items have changed/added/removed.
          return (
            <div key={idx}>
              {item.id}. {item.title} ({item.price})
            </div>
          );
        })}

        {isOpen && <ModalDialog />}
        <DummyAsyncData />
        <button onClick={() => dispatch(openModal())}>Clear</button>
      </header>
    </div>
  );
};

export default Home;
