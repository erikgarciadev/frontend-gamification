import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";

interface AuthState {
  user: IUser | null;
  isLogged: boolean;
}

const initialState: AuthState = {
  isLogged: !!localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.isLogged = false;
      localStorage.clear();
    },
    handleLogin: (
      state,
      action: PayloadAction<{
        user: IUser;
        token: string;
      }>
    ) => {
      state.isLogged = true;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
  },
});

export const { handleLogout, handleLogin } = authSlice.actions;

export default authSlice.reducer;
