import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlice";
import enquireSlice from "./slices/enquireSlice";
import joinSlice from "./slices/joinSlice";
import projectSlice from "./slices/projectSlice";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    enquire: enquireSlice,
    projects: projectSlice,
    blog: blogSlice,
    join: joinSlice,
    ui: uiSlice,
  },
});
