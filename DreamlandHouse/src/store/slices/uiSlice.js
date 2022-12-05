import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showLinearLoader: false,
	profilePicture: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleLinearLoader(state, action) {
			state.showLinearLoader = action.payload;
		},
		setProfilePicture(state, action) {
			state.profilePicture = action.payload;
		},
	},
});

export const { toggleLinearLoader, setProfilePicture } = uiSlice.actions;

export default uiSlice.reducer;
