'use client';

import { useSelector } from 'react-redux';
import { cartsApi } from '../redux/apis/cartsApi';
import { RootState } from '../redux/store';

const Test2 = () => {
  const name = 'cartsContents';
  const query = cartsApi.useGetCartsQuery(name);
  // console.log('query.data', query.data);
  if (query.data) {
        console.log(query.data[0].quantity)
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
