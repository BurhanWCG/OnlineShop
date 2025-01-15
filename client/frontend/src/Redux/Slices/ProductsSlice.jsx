import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the product slice
const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

// Fetch all products (List)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:8000/catelog/products/');  // Corrected API URL
    return response.data;
});

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await axios.get(`http://localhost:8000/catelog/products/${productId}/`);  // Corrected API URL with dynamic product ID
        return response.data;
    }
);

// Create a product  if needed)
export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData) => {
        const response = await axios.post('http://localhost:8000/catelog/products/', productData);  // Corrected API URL
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch a single product
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);  // Add the new product to the list
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
