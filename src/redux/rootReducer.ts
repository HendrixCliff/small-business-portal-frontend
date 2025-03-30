import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import getProductReducer from "./getProductSlice";
import videoReducer from "./productVideoSlice"
import updateReducer from "./updateProductSlice"
import authReducer from './authSlice';
import usersReducer from "./usersSlice";
import receiveMessageReducer from "./receiveMessageSlice"
import orderReducer from "./orderSlice"
// ✅ Combine reducers correctly (No need for "reducer" key inside)


export const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer, // Handles product-related actions
  fetchProducts: getProductReducer, // Handles fetching products
  videos: videoReducer,
  update: updateReducer,
  users: usersReducer,
  receiveMessage: receiveMessageReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
