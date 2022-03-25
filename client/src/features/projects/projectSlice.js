import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createProject = createAsyncThunk("projects/create", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await projectService.createProject(data, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProjects = createAsyncThunk("projects/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await projectService.getProjects(token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteProject = createAsyncThunk("projects/delete", async (projectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await projectService.deleteProject(projectId, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjects: (state) => initialState,
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.projects.push(action.payload);
        state.message = "Project added";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.projects = state.projects.filter((item) => item._id !== action.payload._id);
        state.message = "Project deleted";
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProjects, clearMessage } = projectSlice.actions;
export default projectSlice.reducer;
