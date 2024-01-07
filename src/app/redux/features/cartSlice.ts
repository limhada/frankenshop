import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: 1,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.quantity++;
    },
    decrement: (state) => {
      state.quantity--;
    },
    updateQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    resetQuantity: (state) => {
      state.quantity = 1;
    },
  },
  // extraReducers(builder) {},
});

export const { increment, decrement, updateQuantity, resetQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
