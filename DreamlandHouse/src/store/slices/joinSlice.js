import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formJoin: {
    fullname: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
    identificationType: "",
    identificationFile: "",
    isNotFilipinoCitizen: false,
    foreignIdentificationType: "",
    foreignIdentificationFile: "",
    foreignPlaceOfBirth: "",
    privacyAgreed: false,
  },
};

const joinSlice = createSlice({
  name: "join",
  initialState,
  reducers: {
    setFormJoin(state, action) {
      state.formJoin = action.payload;
    },
    resetFormJoinToInitialState(state) {
      state.formJoin = initialState.formJoin;
    },
  },
});

export const { setFormJoin, resetFormJoinToInitialState } = joinSlice.actions;

export default joinSlice.reducer;
