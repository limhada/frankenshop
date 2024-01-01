
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartsApi = createApi({
  reducerPath: 'cartsApi', // 옵션 설정하지 않으면 기본값은 'api'
  baseQuery: fetchBaseQuery({ baseUrl: '/api/carts' }),
  tagTypes: ['Carts'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => `/contents`,
      providesTags: (result, error, arg) => {
        console.log(result, error, arg, 'providesTags ㅎㅇ~~');
        return [{ type: 'Carts', id: arg.name }];
      },
    }),
    setCart: builder.mutation({
      query: ({ name, value }) => {
        return {
          url: `/cartsApi${name}`,
          method: 'POST',
          body: { value },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Carts', id: arg.name }],
    }),

    
  }),
});