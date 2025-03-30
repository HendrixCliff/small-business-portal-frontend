import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Define Product & Order Types
export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

interface OrderState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

// 🔹 Async Thunk to Place an Order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (products: { productId: string; quantity: number }[], { rejectWithValue }) => {
    try {
      const response = await axios.post("https://small-bussiness-portal.onrender.com/api/v1/orders/order", { products });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

// 🔹 Initial State
const initialState: OrderState = {
  loading: false,
  success: false,
  error: null,
};

// 🔹 Create Redux Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
