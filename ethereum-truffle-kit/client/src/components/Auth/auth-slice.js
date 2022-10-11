import { createSlice } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false },
    reducers: {
        // When we write these functions here then
        // createSlice() automatically generates an
        // action-creator function w/ the same name.
        // Now, when we do an export later in the code,
        // we are essentially exporting the action-creator
        // functions which are automatically created.
        login: (mutableState, action) => {

            // Generally you should not change the state
            // but react toolkit (RTK) uses Immer js internally.
            // (Immer js creates a new state internally for you)
            // That's how Immer allow you to mutate state directly.
            mutableState.isLoggedIn = true;
        },
        logout: (mutableState, action) => {
            mutableState.isLoggedIn = false;
        }
    }
});

export const { login, logout } = authSlice.actions;

// Create a state selector in the slice for data points
// which you foresee might change in the future.
// If the shape of this state ever changed we wouldn't
// have to go through and change each component.
// We just change it once here in the slice.
export const hasLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;