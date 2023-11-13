import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filterSlise';
import cartSlice from './slices/cartSlice';
import pizzaSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzaSlice,
  },
});
