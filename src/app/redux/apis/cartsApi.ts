import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartsApi = createApi({
  reducerPath: 'cartsApi', // 옵션 설정하지 않으면 기본값은 'api'
  baseQuery: fetchBaseQuery({ baseUrl: '/api/carts' }),
  tagTypes: ['Carts'],
  endpoints: (builder) => ({
    // 현재 유저의 장바구니 정보 가져오기
    getCarts: builder.query({
      query: () => `/contents`,
      providesTags: (result, error, arg) => {
        // console.log(result, error, arg, 'cartsApi/providesTags ㅎㅇ~~');
        return [{ type: 'Carts', id: 'quantity' }];
      },
    }),

    // 장바구니 수량 업데이트
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

    // 장바구니에 추가
    addToCart: builder.mutation({
      // useupdateQuantityMutation에서 인자로 넘겨준 값 name, quantity, _id
      query: ({ _id }) => {
        return {
          url: `/addToCart`,
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

    // 장바구니 아이템 삭제
    deleteCartItem: builder.mutation({
      query: ({ _id }) => {
        console.log(_id, ' ㅎㅇ~~~~~~~~~~~~~~~~~~~');
        return {
          url: `/delete`,
          method: 'DELETE',
          body: { _id },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: 'quantity' },
      ],
    }),
  }),
});
