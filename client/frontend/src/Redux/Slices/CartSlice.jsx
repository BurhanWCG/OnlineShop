// redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL (adjust as necessary)
const API_URL = 'http://127.0.0.1:8000/cart/';
const token = localStorage.getItem('accessToken');

// Add to cart thunk
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
        console.log(localStorage.getItem('accessToken'));
      const response = await axios.post(
        'http://127.0.0.1:8000/cart/add/',
        { product_id: productId },
        { headers: { "Authorization": `Bearer ${token}`, } } // Authorization headers in the right place
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get cart items thunk
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
        
      const response = await axios.get("http://127.0.0.1:8000/cart/get/", {
        headers: { "Authorization": `Bearer ${token}`, }, // Authorization headers in the right place
      });
      return response.data.cart_items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove cart item thunk
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/cart/remove/",
        {
          data: { product_id: productId }, // Correct data payload here
          headers: { "Authorization": `Bearer ${token}`, }, // Authorization headers in the right place
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    info : null,
    loading: false,
    error: null,
  },
  reducers: {
    // Local update of product quantity
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const existingItem = state.items.find((item) => item.product_id === productId);
      if (existingItem) {
        existingItem.product_quantity = newQuantity; // Update the local quantity
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Add item to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.message; // Add the product to the cart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      })
      
      // Get cart items
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Set the cart items
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      })

      // Remove item from cart
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload.id); // Remove the item
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      });
  },
});
export const { updateQuantity } = cartSlice.actions; 
export default cartSlice.reducer;
