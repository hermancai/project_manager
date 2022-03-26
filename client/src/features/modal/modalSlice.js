import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  activeForm: null,
  currentTask: {},
  currentBug: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    resetModal: (state) => {
      state.isOpen = false;
    },
    setActiveForm: (state, action) => {
      state.activeForm = action.payload;
      state.isOpen = true;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setCurrentBug: (state, action) => {
      state.currentBug = action.payload;
    },
  },
});

export const { resetModal, setActiveForm, setCurrentTask, setCurrentBug } = modalSlice.actions;
export default modalSlice.reducer;
