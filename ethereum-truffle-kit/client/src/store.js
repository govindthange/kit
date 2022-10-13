import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/Auth/auth-slice';
import modalReducer from './features/ModalDialog/redux-slice';
import dummyDataReducer from './features/DummyAsyncData/dummyDataSlice';
import dummyThunkReducerForFetch from './features/DummyAsyncData/dummyThunkSliceForFetch';
import dummyThunkReducerForAxios from './features/DummyAsyncData/dummyThunkSliceForAxios';

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
