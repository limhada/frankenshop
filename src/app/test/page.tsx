'use client';

import React from 'react';
import { testApi } from '../redux/Features/cartSlice';

const Test = ({ name }: any) => {
  const query = testApi.useGetCountQuery({ name });
  // console.log(query,'query ㅎㅇ~~');
  const mutation = testApi.useSetCountMutation();
  const setCount = mutation[0];
  // console.log("setCount ㅎㅇ~~~~~~~~~~", setCount);
  if (query.isLoading) {
    return <>Loading</>;
  }
  return (
    <div>
      <button
        onClick={async () => {
          // console.log(typeof name, 'name?????');
          // console.log(query.data, 'query.data?????');
          const result = await setCount({ name, value: query.data + 1 });
          // console.log('result ㅎㅇ~~~~~~~~~', result);
          query.refetch(); // 쿼리 재실행
        }}
      >
        {/* {mutation[1].isLoading ? "updating..." : ""} */}
        {/* {query.isFetching ? "fetching..." : ""} */}
        이름: {name} query.data= {query.data}
      </button>
    </div>
  );
};

export default function TestCompo() {
  return (
    <>
      <Test name='1' />
      <Test name='1' />
      <Test name='2' />
      <Test name='3' />
    </>
  );
}
