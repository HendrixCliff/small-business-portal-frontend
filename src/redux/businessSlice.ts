import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface Business {
    _id: string;
    name: string;
    slug: string;
    owner: string;
    description?: string;
    location?: string;
    contact?: string;
    logo?: string;
    category?: string;
  }
  
  interface BusinessState {
    business: Business | null;
    loading: boolean;
    error: string | null;
  }
  
// Async action to fetch business data by slug
export const fetchBusiness = createAsyncThunk<Business, string, { rejectValue: string }>(
  "business/fetchBusiness",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://small-bussiness-portal.onrender.com/api/v1/businesses/${slug}`);
      if (!response.ok) throw new Error("Business not found");
      return (await response.json()) as Business;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerBusiness = createAsyncThunk<
  Business,
  Partial<Business>,
  { rejectValue: string }
>("business/registerBusiness", async (businessData, { rejectWithValue }) => {
  try {
    const response = await fetch("https://small-bussiness-portal.onrender.com/api/v1/businesses/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });

    if (!response.ok) throw new Error("Failed to register business");
    return (await response.json()) as Business;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Initial state with correct typing
const initialState: BusinessState = {
  business: null,
  loading: false,
  error: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearBusiness: (state) => {
      state.business = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusiness.fulfilled, (state, action: PayloadAction<Business>) => {
        state.loading = false;
        state.business = action.payload;
      })
      .addCase(fetchBusiness.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(registerBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBusiness.fulfilled, (state, action: PayloadAction<Business>) => {
        state.loading = false;
        state.business = action.payload;
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to register business";
      });
  },
});

export default businessSlice.reducer;
