import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import productsReducer from './Slices/ProductsSlice'
import cartReducer from '../redux/Slices/CartSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    products : productsReducer,
    cart : cartReducer,
  },
});

export default store;
