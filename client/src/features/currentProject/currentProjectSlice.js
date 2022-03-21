import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import currentProjectService from "./currentProjectService";

const initialState = {
  project: {},
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
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProject } = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
