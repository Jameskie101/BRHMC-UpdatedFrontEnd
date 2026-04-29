import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  roleLevel: number | null; // 0 = admin, 1 = doctor, 2 = nurse
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  roleLevel: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; roleLevel: number }>) => {
      state.token = action.payload.token;
      state.roleLevel = action.payload.roleLevel;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.roleLevel = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('roleLevel');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;