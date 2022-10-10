import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false },
    reducers: {
        login(mutableState, action) {
            mutableState.isLoggedIn = true;
        },
        logout(mutableState, action) {
            mutableState.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;