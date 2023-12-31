'use client';

import React from 'react';
import { testApi } from '../redux/apis/testApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { increment } from '../redux/features/cartSlice';

const Test = ({ name }: any) => {
  const dispatch = useDispatch();

  const query = testApi.useGetCountQuery({ name });

  const mutation = testApi.useSetCountMutation();
  const setCount = mutation[0];

  if (query.isLoading) {
    return <>Loading</>;
  }
  return (
    <div>
      <br />
      <button
        onClick={async () => {
          const result = await setCount({ name, value: query.data + 1 });
          // TODO: tagTypes:를 등록하지 않고 refetch()를 사용해도 됨 하지만 차이가 있음 차이점 정리하기!
          // query.refetch(); // 쿼리 재실행
          console.log('result', result);
          if (query.data !== result) {
            console.log('query.data', query.data, 'result', result);
            // query.data가 변경된 경우
            dispatch(increment());
          }
        }}
      >
        {mutation[1].isLoading ? 'updating...' : ''}
        {query.isFetching ? 'fetching...' : ''}
        버튼{name}번 query.data= {query.data}
      </button>
    </div>
  );
};

export default function TestCompo() {
  const cartState = useSelector((state: RootState) => state.cart.count);

  return (
    <>
      <div>값: {cartState}</div>
      <Test name='1' />
      <Test name='1' />
      <Test name='2' />
      <Test name='3' />
    </>
  );
}
