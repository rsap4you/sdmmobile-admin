import { createSlice } from "@reduxjs/toolkit";

interface otherState {
  bookingInfo: any;
}

const initialState: otherState = {
  bookingInfo: {},
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    onServicesSlice(state, action) {
      state.bookingInfo = action.payload;
    },
  },
});

export const { onServicesSlice } = otherSlice.actions;

export default otherSlice.reducer;
