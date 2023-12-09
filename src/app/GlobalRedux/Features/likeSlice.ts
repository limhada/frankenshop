import { createSlice } from "@reduxjs/toolkit";


export interface likeState {
  likeState: boolean;
}

const initialState: likeState = {
  likeState: false
}

export const likeStateSlice = createSlice({
  name: 'likeState',
  initialState,
  reducers: {
    likeToggle: (state) => {
      state.likeState = !state.likeState
    }
  }
})

export default likeStateSlice.reducer;