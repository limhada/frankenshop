'use client';

import type { RootState } from '../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../GlobalRedux/counterSlice';

import {
  // counterSlice와 counterSlice2에 같은 이름인 increment가 있을 경우 as를 사용해서 이름을 변경하여 사용!
  increment as increment2,
  decrement2,
  incrementByAmount2,
} from '../GlobalRedux/counterSlice2';

import { asyncAxios } from '../GlobalRedux/counterSlice';
import { asyncLikeState } from '../GlobalRedux/Features/likeSlice';

export default function Test() {
  const count = useSelector((state: RootState) => state.counter.value);
  const count2 = useSelector((state: RootState) => state.counter2.value);
  const status = useSelector((state: RootState) => state.counter.status);

  // 비동기 처리 값 확인
  const value2 = useSelector((state: RootState) => state.counter.value2);

  // likeState 테스트
  const likeState = useSelector((state: RootState) => state.like.likeState);
  // const { _id, contents, email, isLiked } = likeState;
  const dispatch = useDispatch();
  const _id = '6509b47802b7712df0cd3d53' // 임의 값을 넣음
  return (
    <div>
      테스트페이지
      <div>
        <div className='bg-lime-100'>
          <span>likeState: {likeState}</span>
          {/* <span>ID: {_id}</span>
          <p>{contents}</p>
          <span>Email: {email}</span>
          {isLiked && <span>Liked</span>} */}
          <button
            onClick={() => {
              dispatch(asyncLikeState(_id));
            }}
          >
            likeState 버튼
          </button>
        </div>
        <div>
          <span>
            <span className='bg-red-300 rounded-lg'>1번 slice 값: {count}</span>
            <div>2번 slice 값: {count2}</div>
          </span>
          <button
            // className={styles.button}
            className='bg-red-300 rounded-lg'
            onClick={() => dispatch(increment())}
          >
            1번 증가{' '}
          </button>
        </div>
        <button
          // className={styles.button}
          className='bg-mycolor1 rounded-lg'
          onClick={() => dispatch(increment2())}
        >
          2번 증가{' '}
        </button>
      </div>
      <div>
        <div>
          <button
            className='bg-red-300 rounded-lg'
            onClick={() => dispatch(decrement())}
          >
            1번 감소
          </button>
        </div>
        <button
          className='bg-mycolor1 rounded-lg'
          onClick={() => dispatch(decrement2())}
        >
          2번 감소
        </button>
      </div>
      <div>
        <button
          className='bg-red-300 rounded-lg'
          onClick={() => dispatch(incrementByAmount(2))}
        >
          1번 Increment by 2
        </button>
      </div>
      <button
        className='bg-mycolor1 rounded-lg'
        onClick={() => dispatch(incrementByAmount2(2))}
      >
        2번 Increment by 2
      </button>
      <div className='bg-slate-500'></div>
      <div>
        비동기 상태:
        <span>
          {/* 비동기 상태 */}
          {status}
        </span>
        <div>비동기 값 확인: {value2}</div>
      </div>
      {/* redux thunk 테스트 */}
      <button
        className='bg-red-300 rounded-lg'
        onClick={() => {
          dispatch(asyncAxios());
        }}
      >
        비동기 테스트 버튼
      </button>
    </div>
  );
}
