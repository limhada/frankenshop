import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ContentItem } from '@/app/mainpage/Contents';
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
      const { data } = await axios.post('/api/contents/likeChange', { _id });
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
    likeToggle: (state, action) => {
      // state: 현재의 상태. 우리가 관리하고 있는 상태 데이터입
      // action: 디스패치된 액션 객체. 이 객체는 어떤 종류의 액션이 발생했는지 식별하고 추가적인 데이터를 포함할 수 있다

      const toggledId = action.payload._id;
      // console.log('toggledId= ~~~~~~~', toggledId);
      // state.contentsData의 _id가 toggledId와 일치하는 객체 찾기
      const targetItem = state.contentsData.findIndex((item: ContentItem) => {
        if (item._id === toggledId) {
          item.isLiked = !item.isLiked;
        }
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(asyncContents.fulfilled, (state, action) => {
      state.contentsData = action.payload;
      console.log('state.contentsData = ㅎㅇ~~~~~~~1', state.contentsData);
    }),
      builder.addCase(likeChange.fulfilled, (state, action) => {
        state.likeState = action.payload;
      });
  },
});

// export const {} = contentsSlice.actions
export const { likeToggle } = contentsSlice.actions;
export default contentsSlice.reducer;
