import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  token?: string;
  name?: string;
}

interface AuthState {
  loading: boolean;
  user: UserData;
  token: null | string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: {},
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLoginRequest(state) {
      state.loading = true;
    },
    onLoginSuccess(state, action: PayloadAction<{ data: UserData }>) {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload.data.token || null;
      state.isAuthenticated = true;
    },
    onLoginFailed(state) {
      state.loading = false;
    },
    onLogoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.token = null;
    },
  },
});

export const { onLoginRequest, onLoginSuccess, onLoginFailed, onLogoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
