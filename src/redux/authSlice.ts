import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, signup } from './fetchData';

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
}

// Define the AuthState interface
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  errorMessage: string | null;
  protectedMessage: string | null;
  forgotPasswordMessage: string | null;
  isLoggedIn: boolean;
  cookie?: string | null;
}

// Define the response from authentication API
interface AuthResponse {
  token: string;
  cookie?: string;
  data: {
    user: User;
  };
}


// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  successMessage: null,
  errorMessage: null,
  protectedMessage: null,
  forgotPasswordMessage: null,
  isLoggedIn: false,
  cookie: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      state.errorMessage = null;
      state.protectedMessage = null;
      state.forgotPasswordMessage = null;
      state.cookie = null;
    },
    clearAuthMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.user = action.payload.data.user; // ✅ Corrected here
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        state.cookie = action.payload.cookie || null;
      })
      
      
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Login failed';
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.user = action.payload.data.user; // ✅ Extract user from `data`
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        state.cookie = action.payload.cookie || null;
      })
      
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Signup failed';
      });
  },
});

export const { logout, clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;
