import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/Auth/auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;