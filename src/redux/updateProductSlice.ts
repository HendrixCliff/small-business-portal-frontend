import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  [key: string]: any; // Allows additional properties
}

// Define the state type
interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};


export const updateProduct = createAsyncThunk<
  Product,
  { id: string; updates: Partial<Product> },
  { rejectValue: string }
>("product/updateProduct", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`http://localhost:8000/api/v1/products/${id}`, updates);
    return response.data; // The updated product
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Failed to update product");
  }
});

// Product slice
const updateProductSlice = createSlice({
  name: "update",
  initialState,
  reducers: {}, // No synchronous reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default updateProductSlice.reducer;
