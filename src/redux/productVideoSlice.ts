import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";



interface Video {
  _id: string;
  title: string;
  url: string;
}


interface VideoState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}


const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
};
 
// 🔹 Async Thunk to Upload Video
export const uploadVideo = createAsyncThunk(
  "videos/upload",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://small-bussiness-portal.onrender.com/api/v1/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.video; // The uploaded video details
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Video upload failed");
    }
  }
);

export const fetchVideos = createAsyncThunk<Video[], void, { rejectValue: string }>(
  "videos/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Video[]>("https://small-bussiness-portal.onrender.com/api/v1/videos/productVideos"); // Adjust API URL accordingly
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch videos");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/videos/${id}`); // Adjust API route accordingly
      return id; // Return the deleted product's ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete product");
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload);
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        
        state.videos = state.videos.filter((video) => video._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});


export default videoSlice.reducer;
