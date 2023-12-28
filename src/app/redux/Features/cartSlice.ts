import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// 모든 컨텐츠 정보 비동기 요청
export const asyncContents: any = createAsyncThunk(
  'contentsSlice/asynContents',
  async () => {
    try {
      const { data } = await axios.get(`/api/contents/allContents`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const likeChange: any = createAsyncThunk(
  'contentsSlice/likeChange',
  async (_id) => {
    try {
      const { data } = await axios.post('/api/contents/likeChange', _id);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  contentsData: [],
  likeState: [],
};

export const cartSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    likeToggle: (state, action) => {
    },
  },



  extraReducers(builder) {
    builder.addCase(asyncContents.fulfilled, (state, action) => {
      state.contentsData = action.payload;
      // console.log('state.contentsData = ㅎㅇ~~~~~~~', state.contentsData);
    }),
      builder.addCase(likeChange.fulfilled, (state, action) => {
        state.likeState = action.payload;
      });
  },
});

export const { likeToggle } = cartSlice.actions;
export default cartSlice.reducer;
