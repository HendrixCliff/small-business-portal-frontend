import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Business {
  _id: string;
  name: string;
  description: string;
}

interface BusinessState {
  businesses: Business[];
  loading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  businesses: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch businesses from API
export const fetchBusinesses = createAsyncThunk<
  Business[], // Return type (array of businesses)
  void,       // No argument needed
  { rejectValue: string } // Error type
>("businessList/fetchBusinesses", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://small-bussiness-portal.onrender.com/api/v1/businesses");
    if (!response.ok) throw new Error("Failed to fetch businesses");
    return (await response.json()) as Business[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const businessListSlice = createSlice({
  name: "businessList",
  initialState,
  reducers: {
    // ✅ Search filter: updates businesses list based on search query
    filterBusinesses: (state, action: PayloadAction<string>) => {
      state.businesses = state.businesses.filter((b) =>
        b.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinesses.fulfilled, (state, action: PayloadAction<Business[]>) => {
        state.loading = false;
        state.businesses = action.payload;
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export const { filterBusinesses } = businessListSlice.actions;
export default businessListSlice.reducer;
