import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/rootReducer";
import io from "socket.io-client";
import axios from "axios";

// Define the Message type
export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  text: string;
  timestamp: string;
}

// Define the initial state
interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};

// Socket.io instance
const socket = io("http://localhost:8000"); // Change to your backend URL

// Async thunk to fetch messages
export const fetchMessages = createAsyncThunk<
  Message[], // ✅ The expected return type when successful
  string, // ✅ The `userId` argument type
  { rejectValue: string } // ✅ Ensures rejected value is a string
>(
  "messages/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://small-bussiness-portal.onrender.com/api/v1/messages/${userId}`);
      console.log("API response:", response.data); // Debugging log
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) { // ✅ Explicitly typing `error`
      return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
    }
  }
);

  
// Messages slice
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload; // ✅ Replace messages instead of appending duplicates
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong"; // ✅ Ensures `error` is a string
      });
      
  },
});


export const selectMessages = (state: RootState) => state.receiveMessage.messages || [];


// Listen for incoming messages via Socket.IO
export const listenForMessages = (userId: string) => (dispatch: any) => {
    socket.emit("joinChat", userId); // ✅ Join user's chat room
  
    socket.on("chatHistory", (messages: Message[]) => {
      dispatch(setMessages(messages)); // ✅ Replace messages instead of refetching
    });
  
    socket.on("newMessage", (message: Message) => {
      dispatch(addMessage(message)); // ✅ Append only new messages
    });
  };
  
  
// Export reducer
export default messagesSlice.reducer;
export const { addMessage, setMessages } = messagesSlice.actions;