import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ContentItem } from '../../mainpage/Contents';

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

export const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    // 해당 _id에 해당하는 객체의 isLiked 값을 토글하는 역할을 하는 reducer
    likeToggle: (state, action) => {
      const toggledId = action.payload._id;
      // console.log('toggledId= ~~~~~~~', toggledId);
      // state.contentsData의 _id가 toggledId와 일치하는 객체 찾기
      state.contentsData.findIndex((item: ContentItem) => {
        if (item._id === toggledId) {
          item.isLiked = !item.isLiked;
        }
      });
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

export const { likeToggle } = contentsSlice.actions;
export default contentsSlice.reducer;
