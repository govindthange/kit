import './index.css';
import {useDispatch, useSelector} from 'react-redux';
import {
  reload,
  getRecords,
  getStatus,
  getError,
  fetchAsyncRecordsWithAxios
} from './dummyDataSlice';
import {useEffect} from 'react';
import DummyDataPoint from './components/DummyDataPoint';

const DummyAsyncData = () => {
  const dispatch = useDispatch();

  const items = useSelector(getRecords);
  const status = useSelector(getStatus);
  const err = useSelector(getError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAsyncRecordsWithAxios());
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (status === 'succeeded') {
    content = items.map((item, idx) => {
      // 'key' in child components help react identify which items have changed/added/removed.
      return <DummyDataPoint key={idx} {...item} />;
    });
  } else if (status === 'failed') {
    content = <p>{err}</p>;
  }

  return (
    <section className="dummy-async-data">
      <br />
      <h4>Dummy async. data from axios() API</h4>
      <button onClick={() => dispatch(reload())}>Reload</button>
      {content}
    </section>
  );
};

export default DummyAsyncData;
