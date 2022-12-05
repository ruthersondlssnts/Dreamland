import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showEnquire: false,
  formEnquire: {
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    location: "",
    project: "",
    apartmentType: "",
    bedrooms: "",
    referenceNumber: "",
    message: "",
  },
};

const enquireSlice = createSlice({
  name: "enquire",
  initialState,
  reducers: {
    toggleEnquire(state) {
      state.showEnquire = !state.showEnquire;
    },
    setFormEnquire(state, action) {
      state.formEnquire = action.payload;
    },
    resetFormEnquireToInitialState(state) {
      state.formEnquire = initialState.formEnquire;
    },
  },
});

export const { toggleEnquire, setFormEnquire, resetFormEnquireToInitialState } =
  enquireSlice.actions;

export default enquireSlice.reducer;
