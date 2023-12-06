'use client'

import type { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../GlobalRedux/counterSlice";

export default function Test2() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()


  return <div>테스트페이지
    <div>
      <button
      // className={styles.button}
      className='bg-mycolor1 rounded-lg'
      onClick={() => dispatch(increment())}
      >증가 </button>
    </div>
    <span>
      값: {count}
    </span>
    <div>
       <button
      className='bg-mycolor1 rounded-lg'
      onClick={() => dispatch(decrement())}
      >감소</button>
    </div>
    <button
    className='bg-mycolor1 rounded-lg'
    onClick={() => dispatch(incrementByAmount(2))}
    >Increment by 2</button>
  </div>
}
