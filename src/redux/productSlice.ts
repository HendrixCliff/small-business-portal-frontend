import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Update: Accept FormData instead of `{ name, file }`
export const uploadProduct = createAsyncThunk(
  "product/uploadProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://small-bussiness-portal.onrender.com/api/v1/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

// ✅ Update: Ensure `error` can be `string | null`
interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  success: false,
  error: null, // ✅ Now `error` can be either `null` or `string`
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // ✅ Now this works without TypeScript error
      });
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
