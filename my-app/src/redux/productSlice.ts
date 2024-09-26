// productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductAPIResponse } from '../types/product';

interface ProductState {
  products: Product[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  page: 1,
  limit: 10,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const skip = (page - 1) * limit;
      const response = await axios.get<ProductAPIResponse>(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
    
      return { products: response.data.products, total: response.data.total };
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      console.error('Failed to fetch products:', action.payload);
    });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
