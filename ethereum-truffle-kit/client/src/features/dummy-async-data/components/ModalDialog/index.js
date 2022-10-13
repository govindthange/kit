import './index.css';
import {useDispatch} from 'react-redux';
import {clear} from '../../dummyDataSlice';
import {closeModal} from './redux-slice';

const ModalDialog = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all messages from the screen?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clear());
              dispatch(closeModal());
            }}>
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              dispatch(closeModal());
            }}>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default ModalDialog;
