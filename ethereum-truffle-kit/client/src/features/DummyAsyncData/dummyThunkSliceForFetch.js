import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const DUMMY_DATA_URL = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  data: [],
  isLoading: true,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// 1st argument is the action-type.
// 2nd argument is a callback function that returns a promise.
export const fetchAsyncDataWithFetch = createAsyncThunk(
  'dummyAsyncDataFromFetch/fetchAsyncDataWithFetch',
  () => {
    // Note that 404 error are not handled as errors by the fetch API.
    // In order to handle 404 as valid error use AXIOS library.
    // Refer dummyThunkSliceForAxios.js for understanding AXIOS.
    return fetch(DUMMY_DATA_URL)
      .then(resp => resp.json())
      .catch(err => console.log(err));
  }
);

const dummyThunkSliceForFetch = createSlice({
  name: 'dummyAsyncDataFromFetch',
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
    [fetchAsyncDataWithFetch.pending]: mutableState => {
      mutableState.status = 'loading';
      mutableState.isLoading = true;
    },
    [fetchAsyncDataWithFetch.fulfilled]: (mutableState, action) => {
      mutableState.status = 'succeeded';
      mutableState.isLoading = false;
      mutableState.data = action.payload;
    },
    [fetchAsyncDataWithFetch.rejected]: (mutableState, action) => {
      mutableState.status = 'failed';
      mutableState.isLoading = true;

      // Following code won't handle 404 error received
      // by the fetch() API. For catching 404 error
      // use AXIOS library (Ref. dummyThunkSliceForAxios.js)
      mutableState.error = action.error.message; // To be tested!!
    }
  }
});

// Note that we didn't setup action-creator manually!
// We actually setup a function that automatically returns it.
export const {removeItem, clear, reload, recordAdded} = dummyThunkSliceForFetch.actions;

// We need not export fetchAsyncDataWithFetch. Its already done above!

export default dummyThunkSliceForFetch.reducer;
