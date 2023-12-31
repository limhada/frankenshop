
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  reducerPath: 'testApi', // 옵션 설정하지 않으면 기본값은 'api'
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