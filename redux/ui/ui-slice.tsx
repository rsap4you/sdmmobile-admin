import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  sidebarCollapsed: boolean; // desktop: sidebar hidden
  mobileSidebar: boolean; // mobile: sidebar open
};

const initialState: UIState = {
  sidebarCollapsed: false,
  mobileSidebar: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    toggleMobileSidebar(state) {
      state.mobileSidebar = !state.mobileSidebar;
    },
    closeMobileSidebar(state) {
      state.mobileSidebar = false;
    },
  },
});

export const { toggleSidebar, toggleMobileSidebar, closeMobileSidebar } = uiSlice.actions;
export default uiSlice.reducer;
