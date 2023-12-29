import { configureStore } from '@reduxjs/toolkit';
import contentsReducer from '../redux/Features/contentsSlice';
import { testApi } from '../redux/Features/cartSlice'

export const store = configureStore({
  reducer: {
    // 실제 사용되는 이름
    // counter 이름은 소비자 페이지인 test/page.tsx에서
    // useSelector(안에서 사용되는 이름)
    // counter: counterReducer,
    contents: contentsReducer,

    // testApi: testApi.reducer // 아래 코드와 동치
    // reducerPath: 'testApi' testApi를 직접 입력해도 되지만 좀 더 유연함을 위해 [testApi.reducerPath]
    [testApi.reducerPath]: testApi.reducer,
  },
  // 데스툴 사용여부
  // devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware),
});

// Redux 스토어의 상태 타입을 정의
// store.getState 함수는 스토어의 현재 상태를 반환하며, 이 타입은 해당 상태의 구조를 정확하게 반영
export type RootState = ReturnType<typeof store.getState>;

//  Redux 스토어의 dispatch 함수 타입을 정의
// store.dispatch 함수는 액션 객체를 전달하여 스토어의 상태를 변경하는 데 사용
export type AppDispatch = typeof store.dispatch;
