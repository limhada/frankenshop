'use client';

import { cartsApi } from '../redux/apis/cartsApi';

const Test2 = () => {
  let name = 'cartsContents';
  const query = cartsApi.useGetCartQuery(name);
  // console.log('query.data', query.data);
  if (query.data) {
    // console.log('query.data', query.data[0]);
  }
  // const mutation = cartsApi.useSetCartMutation();
  // const setCount = mutation[0];

  return (
    <div>
      <h1>테스트2</h1>
      <div>서버에서 받아온 값: </div>
    </div>
  );
};

export default Test2;
