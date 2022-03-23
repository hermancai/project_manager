import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import currentProjectService from "./currentProjectService";

const initialState = {
  project: {},
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProject = createAsyncThunk("project/getData", async (projectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await currentProjectService.getData(projectId, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editProject = createAsyncThunk("project/edit", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await currentProjectService.editProject(data, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addTask = createAsyncThunk("project/addTask", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await currentProjectService.addTask(data, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTask = createAsyncThunk("project/deleteTask", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await currentProjectService.deleteTask(id, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editTask = createAsyncThunk("project/editTask", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await currentProjectService.editTask(data, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const currentProjectSlice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    resetProject: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload.project;
        state.tasks = action.payload.tasks;
      })
      .addCase(editProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.project.name = action.payload.name;
        state.project.description = action.payload.description;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tasks = state.tasks.filter((item) => item._id !== action.payload._id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        const taskToUpdate = state.tasks.find((e) => e._id === action.payload._id);
        taskToUpdate.description = action.payload.description;
        taskToUpdate.completed = action.payload.completed;
        taskToUpdate.priority = action.payload.priority;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProject } = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
