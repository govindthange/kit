import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const DUMMY_DATA_URL = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  data: [],
  isLoading: true,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// 1st argument is the action-type.
// 2nd argument is a callback function that returns a promise.
// Note the use of async/await pattern!
export const fetchAsyncDataWithAxios = createAsyncThunk(
  'dummyAsyncDataFromAxios/fetchAsyncDataWithAxios',
  async (param1, thunkApi) => {
    try {
      // param1 is the parameter received from the component that dispatches action.

      // Usage 1.
      // thunkApi gives access to .getState()
      // console.log(thunkApi.getState());

      // Usage 2.
      // thunkApi can even allow you to issue dispatch call like so:
      // thunkApi.dispatch(openModal()); // you don't even need to import openModal!

      const response = await axios(DUMMY_DATA_URL);
      return response.data;
    } catch (err) {
      // Note that 404 error are not handled as errors by the fetch API.
      // In order to handle 404 as valid error here are we are using AXIOS library.
      return thunkApi.rejectWithValue('Something went wrong!');
    }
  }
);

const dummyThunkSliceForAxios = createSlice({
  name: 'dummyAsyncDataFromAxios',
  initialState,

  // These are reducers for synchronous operations.
  reducers: {
    removeItem: (mutableState, action) => {
      mutableState.data = mutableState.data.filter(item => item.id !== action.payload);
    },
    clear: () => {
      return {
        data: []
      };
    },
    reload: () => {
      return {
        data: [],
        status: 'idle'
      };
    }
  },

  // These reducers w/ lifecycle-actions for async. operations.
  // For every async-function we create using createAsyncThunk
  // we will get 3 lifecycle-actions.
  extraReducers: {
    [fetchAsyncDataWithAxios.pending]: mutableState => {
      mutableState.status = 'loading';
      mutableState.isLoading = true;
    },
    [fetchAsyncDataWithAxios.fulfilled]: (mutableState, action) => {
      mutableState.status = 'succeeded';
      mutableState.isLoading = false;
      mutableState.data = action.payload;
    },
    [fetchAsyncDataWithAxios.rejected]: (mutableState, action) => {
      mutableState.status = 'failed';
      mutableState.isLoading = true;

      // action.payload will have the error value
      // set by thunkApi.rejectWithValue('Something went wrong!')
      // in the try-catch block of the the callback returned
      // by fetchAsyncDataWithAxios() function.
      mutableState.error = action.payload;
    }
  }
});

// Note that we didn't setup action-creator manually!
// We actually setup a function that automatically returns it.
export const {removeItem, clear, reload, recordAdded} = dummyThunkSliceForAxios.actions;

// We need not export fetchAsyncDataWithAxios. Its already done above!

export default dummyThunkSliceForAxios.reducer;
