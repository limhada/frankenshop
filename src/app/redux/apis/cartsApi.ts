import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartsApi = createApi({
  reducerPath: 'cartsApi', // 옵션 설정하지 않으면 기본값은 'api'
  baseQuery: fetchBaseQuery({ baseUrl: '/api/carts' }),
  tagTypes: ['Carts'],
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => `/contents`,
      providesTags: (result, error, arg) => {
        // console.log(result, error, arg, 'cartsApi/providesTags ㅎㅇ~~');
        return [{ type: 'Carts', id: 'quantity' }];
      },
    }),

    updateQuantity: builder.mutation({
      // useupdateQuantityMutation에서 인자로 넘겨준 값 name, quantity, _id
      query: ({ name, quantity, _id }) => {
        return {
          url: `/contents`,
          method: 'POST',
          // 서버로 전송할 body
          body: { name, quantity, _id },
        };
      },
      invalidatesTags: (result, error, arg) => [
        // { type: 'Carts', id: arg.name },
        { type: 'Carts', id: 'quantity' },
      ],
    }),

    addToCart: builder.mutation({
      // useupdateQuantityMutation에서 인자로 넘겨준 값 name, quantity, _id
      query: ({ _id }) => {
        return {
          url: `/addToCart2`,
          method: 'POST',
          // 서버로 전송할 body
          body: { _id },
        };
      },
      invalidatesTags: (result, error, arg) => [
        // { type: 'Carts', id: arg.name },
        { type: 'Carts', id: 'quantity' },
      ],
    }),
  }),
});
