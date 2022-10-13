import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit';
import {sub} from 'date-fns';
import axios from 'axios';

const DUMMY_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  records: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const fetchAsyncRecordsWithAxios = createAsyncThunk(
  'dummyAsyncData/fetchRecordsWithAxios',
  async () => {
    const response = await axios.get(DUMMY_DATA_URL);
    return response.data;
  }
);

// 1st argument is the action-type.
// 2nd argument is a callback function that returns a promise.
export const addAsyncRecordWithAxios = createAsyncThunk(
  'dummyAsyncData/addRecordsWithAxios',
  async initialPost => {
    const response = await axios.post(DUMMY_DATA_URL, initialPost);
    return response.data;
  }
);

const dummyDataSlice = createSlice({
  name: 'dummyAsyncData',
  initialState,
  reducers: {
    // When we write these functions here then
    // createSlice() automatically generates an
    // action-creator function w/ the same name.
    // Now, when we do an export later in the code,
    // we are essentially exporting the action-creator
    // functions which are automatically created.
    removeItem: (mutableState, action) => {
      // Generally you should not change the state
      // but react toolkit (RTK) uses Immer js internally.
      // (Immer js creates a new state internally for you)
      // That's how Immer allow you to mutate state directly.
      mutableState.records = mutableState.records.filter(item => item.id !== action.payload);
    },
    clear: () => {
      // NOTE:
      // Generally we will mutate/update the passed state and leave
      // rest to the Immer to ensure the main state gets updated.
      // But if we return any thing from this function it will
      // become the new state!
      // return { a: some-thing-a, b: some-thing-b}
      return {
        records: []
      };
    },
    reload: () => {
      return {
        records: [],
        status: 'idle'
      };
    },
    recordAdded: {
      reducer(mutableState, action) {
        mutableState.records.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId
          }
        };
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncRecordsWithAxios.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncRecordsWithAxios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Adding date
        let min = 1;
        state.records = action.payload.map(post => {
          post.date = sub(new Date(), {minutes: min++}).toISOString();
          return post;
        });
      })
      .addCase(fetchAsyncRecordsWithAxios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addAsyncRecordWithAxios.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedRecords & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedRecords = state.records.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedRecords[sortedRecords.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        console.log(action.payload);
        state.records.push(action.payload);
      });
  }
});

// Create a state selector in the slice for data points
// which you foresee might change in the future.
// If the shape of this state ever changed we wouldn't
// have to go through and change each component.
// We just change it once here in the slice.
export const getRecords = state => state.dummyAsyncData.records;
export const getStatus = state => state.dummyAsyncData.status;
export const getError = state => state.dummyAsyncData.error;

// Note that we didn't setup action-creator manually!
// We actually setup a function that automatically returns it.
export const {removeItem, clear, reload, recordAdded} = dummyDataSlice.actions;

export default dummyDataSlice.reducer;
