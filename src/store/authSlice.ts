import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface UserData {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null; 
  counter: number; 
}
 
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  counter: 0, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    }, 
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.counter = 0;
    }, 
    incrementCounter: (state) => {
        state.counter += 1;
    }
  },
});

export const { login, logout, incrementCounter } = authSlice.actions;

export default authSlice.reducer;