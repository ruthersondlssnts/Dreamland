import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  locations: [],
  projectLocationAutocomplete: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setProjectLocationAutocomplete: (state, action) => {
      state.projectLocationAutocomplete = action.payload;
    },
  },
});

export const { setProjects, setLocations, setProjectLocationAutocomplete } =
  projectSlice.actions;

export default projectSlice.reducer;
