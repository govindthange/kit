import {configureStore} from '@reduxjs/toolkit';
import authReducer from './components/Auth/auth-slice';
import modalReducer from './components/ModalDialog/redux-slice';
import dummyDataReducer from './components/DummyAsyncData/dummyDataSlice';
import dummyThunkReducerForFetch from './components/DummyAsyncData/dummyThunkSliceForFetch';
import dummyThunkReducerForAxios from './components/DummyAsyncData/dummyThunkSliceForAxios';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    dummyAsyncData: dummyDataReducer,
    dummyAsyncDataFromFetch: dummyThunkReducerForFetch,
    dummyAsyncDataFromAxios: dummyThunkReducerForAxios
  }
});

export default store;
