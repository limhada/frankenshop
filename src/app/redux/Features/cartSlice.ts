import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import axios from 'axios';

// API 서비스 정의
export const testApi = createApi({
  reducerPath: 'testApi', // 옵션
  baseQuery: fetchBaseQuery({ baseUrl: "/api/test" }),
  // tagTypes: ["Count"],
  endpoints: (builder) => ({
    getCount: builder.query({
      query: ({ name }) => `/testApi${name}`,
      // providesTags: (result, error, arg) => {
      //   console.log(result, error, arg, 'ㅎㅇ~~');
      //   return [{ type: "Count", id: arg.name }];
      // }
    }),
    setCount: builder.mutation({
      query: ({ name, value }) => {
        return {
          url: `/testApi${name}`,
          method: "POST",
          body: { value }
        };
      },
      // invalidatesTags: (result, error, arg) => [{ type: "Count", id: arg.name }]
    })
  })
});


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
  name: 'cart',
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
