import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import currentProjectReducer from "../features/currentProject/currentProjectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    currentProject: currentProjectReducer,
  },
});
