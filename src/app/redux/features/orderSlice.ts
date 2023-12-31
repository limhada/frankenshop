import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  itemId: '',
  totalPrice: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    /**  상세페이지에서 구매하기 클릭 시 해당상품의 _id와 db에 추가된 주문서의 _id정보를 업데이트 */
    setOrder: (state, action) => {
      state._id = action.payload._id;
      state.itemId = action.payload.itemId;
      state.totalPrice = action.payload.totalPrice;
      // console.log(action.payload, "action.payload")
      // console.log('action.payload._id=', action.payload._id, 'action.payload.itemId=', action.payload.itemId);
    },

    /** 업데이트 했던 정보 초기화 */
    resetOrder: (state) => {
      state._id = '';
      state.itemId = '';
      state.totalPrice = 0;
    },
  },
  // extraReducers(builder) {},
});

export const { setOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
