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

export default function Test() {
  const count = useSelector((state: RootState) => state.counter.value);
  const count2 = useSelector((state: RootState) => state.counter2.value);
  const dispatch = useDispatch();

  return (
    <div>
      테스트페이지
      <div>
        <div>
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
      <span>
        <div className='bg-red-300'>1번 slice 값: {count}</div>
        <div>2번 slice 값: {count2}</div>
      </span>
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
    </div>
  );
}
