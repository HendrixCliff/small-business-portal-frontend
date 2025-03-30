import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Define Login and Signup Payloads
interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
}

// Define User and AuthResponse Interfaces
interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  cookie?: string;
  data: {
    user: User;
  };
}

// Signup Thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        "https://small-bussiness-portal.onrender.com/api/v1/auth/signup",
        userData
      );

      // ✅ Correct user extraction
      if (!response.data.data?.user) {
        throw new Error("User data is missing in response");
      }

      return response.data; // Returns AuthResponse
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await fetch("https://small-bussiness-portal.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: AuthResponse = await response.json();

      // ✅ Correct user extraction
      if (!data.token || !data.data?.user) {
        throw new Error("Invalid response: Missing token or user");
      }

      return data; // Returns AuthResponse
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
