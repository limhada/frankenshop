import { createSlice } from '@reduxjs/toolkit';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  reducerPath: 'testApi', // 옵션
  baseQuery: fetchBaseQuery({ baseUrl: '/api/test' }),
  tagTypes: ['Test'],
  endpoints: (builder) => ({
    getCount: builder.query({
      query: ({ name }) => `/testApi${name}`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg, 'providesTags ㅎㅇ~~');
        return [{ type: 'Test', id: arg.name }];
      },
    }),
    setCount: builder.mutation({
      query: ({ name, value }) => {
        return {
          url: `/testApi${name}`,
          method: 'POST',
          body: { value },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Test', id: arg.name }],
    }),
  }),
});

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

  extraReducers(builder) {},
});

export const { increment } = cartSlice.actions;
export default cartSlice.reducer;
