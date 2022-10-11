import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (mutableState, action) => {
      mutableState.isOpen = true;
    },
    closeModal: (mutableState, action) => {
      mutableState.isOpen = false;
    }
  }
});

export const {openModal, closeModal} = slice.actions;

export default slice.reducer;
