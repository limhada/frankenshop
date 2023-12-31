import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  testState: '초기',
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
  // extraReducers(builder) {},
});

export const { increment } = cartSlice.actions;
export default cartSlice.reducer;
