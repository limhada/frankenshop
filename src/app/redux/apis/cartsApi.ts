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
      query: ({ _id, quantity }) => {
        // 디테일 페이지일 경우 현재 선택된 quantity를 받아와서 api요청 시 quantity를 함께 보냄
        if (quantity) {
          return {
            url: `/addToCart`,
            method: 'POST',
            // 서버로 전송할 body
            body: { _id, quantity },
          };
        } else {
          return {
            url: `/addToCart`,
            method: 'POST',
            // 서버로 전송할 body
            body: { _id },
          };
        }
      },
      invalidatesTags: (result, error, arg) => [
        // { type: 'Carts', id: arg.name },
        { type: 'Carts', id: 'quantity' },
      ],
    }),

    // 장바구니의 해당 아이템 삭제
    deleteCartItem: builder.mutation({
      query: ({ _id }) => {
        // console.log(_id, ' ㅎㅇ~~~~~~~~~~~~~~~~~~~');
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


    // 장바구니의 선택한 모든 아이템 삭제
    deleteSelectedCartItem: builder.mutation({
      query: ( selectedIds ) => {
        // console.log(_id, ' ㅎㅇ~~~~~~~~~~~~~~~~~~~');
        return {
          url: `/deleteSelected`,
          method: 'DELETE',
          body: { selectedIds },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: 'quantity' },
      ],
    }),

    // 장바구니의 해당 아이템의 체크박스 상태 전환
    toggleCheckbox: builder.mutation({
      query: ({ _id }) => {
        // console.log(_id, ' ㅎㅇ~~~~~~~~~~~~~~~~~~~');
        return {
          url: `/toggleCheckbox`,
          method: 'POST',
          body: { _id },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: 'quantity' },
      ],
    }),

    // 장바구니의 해당 아이템의 체크박스 상태 전환
    toggleAllCheckbox: builder.mutation({
      query: () => {
        // console.log(_id, ' ㅎㅇ~~~~~~~~~~~~~~~~~~~');
        return {
          url: `/toggleAllCheckbox`,
          method: 'POST',
          // body: {},
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Carts', id: 'quantity' },
      ],
    }),
  }),
});
