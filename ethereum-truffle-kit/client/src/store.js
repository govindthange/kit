import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authentication/authenticationSlice';
import modalReducer from './features/dummy-async-data/components/ModalDialog/redux-slice';
import dummyDataReducer from './features/dummy-async-data/dummyDataSlice';
import dummyThunkReducerForFetch from './features/dummy-async-data/dummyThunkSliceForFetch';
import dummyThunkReducerForAxios from './features/dummy-async-data/dummyThunkSliceForAxios';

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
