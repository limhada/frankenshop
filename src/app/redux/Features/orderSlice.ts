import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemId: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setItemId: (state, action) => {
      state.itemId = action.payload;
      // console.log(action.payload, '???????????????????????');
    },
    resetItemId: (state) => {
      state.itemId = '';
    },
  },
  // extraReducers(builder) {},
});

export const { setItemId, resetItemId } = orderSlice.actions;
export default orderSlice.reducer;
