import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi', // 옵션 설정하지 않으면 기본값은 'api'
  baseQuery: fetchBaseQuery({ baseUrl: '/api/order' }),
  tagTypes: ['Oder'],
  endpoints: (builder) => ({

    getOder: builder.query({
      query: ({ _id, itemId, totalPrice }) => `/contents?_id=${_id}&itemId=${itemId}&totalPrice=${totalPrice}`,
      providesTags: (result, error, arg) => {
        // console.log(result, error, arg, 'cartsApi/providesTags ㅎㅇ~~');
        return [{ type: 'Oder', id: 'payment' }];
      },
    }),

    payment: builder.mutation({
      query: ({ itemId, quantity, totalPrice }) => {
        // console.log(_id, ' ㅎㅇ~~~~~~~~~~~~~~~~~~~');
        return {
          url: `/payment`,
          method: 'POST',
          body: { itemId, quantity, totalPrice },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Oder', id: 'payment' },
      ],
      
    }),

  }),
});
