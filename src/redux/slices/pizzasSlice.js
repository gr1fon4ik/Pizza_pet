import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ category, search, currentPage, activeIndexSort }) => {
    const response = await axios.get(
      `https://64ca87b8700d50e3c70504e3.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${activeIndexSort.sortProperty}&order=desc`,
    );
    return response.data;
  },
);

const initialState = {
  items: [],
  status: 'loading', //loading,success, error
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
