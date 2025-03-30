import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number; // 🔹 Add stock property here
  imageUrls?: string[];
  description?: string;
}



interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}


const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
  };

  export const getAllProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    "products/getAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("https://small-bussiness-portal.onrender.com/api/v1/products/");
        console.log("API Response:", response.data); // ✅ Debug API response
        return response.data;
      } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message); // ✅ Debug API error
        return rejectWithValue(error.response?.data?.error || "Failed to fetch products");
      }
    }
  );
  
  export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id: string, { rejectWithValue }) => {
      try {
        await axios.delete(`https://small-bussiness-portal.onrender.com/api/v1/products/${id}`); // Adjust API route accordingly
        return id; // Return the deleted product's ID
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to delete product");
      }
    }
  );

// Product slice
const getProductSlice = createSlice({
  name: "fetchProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      })
  },
});

export default getProductSlice.reducer;
