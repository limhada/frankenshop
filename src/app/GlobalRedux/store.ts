import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Redux 스토어의 상태 타입을 정의
// store.getState 함수는 스토어의 현재 상태를 반환하며, 이 타입은 해당 상태의 구조를 정확하게 반영
export type RootState = ReturnType<typeof store.getState>

//  Redux 스토어의 dispatch 함수 타입을 정의
// store.dispatch 함수는 액션 객체를 전달하여 스토어의 상태를 변경하는 데 사용
export type AppDispatch = typeof store.dispatch