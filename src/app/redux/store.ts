import { configureStore } from '@reduxjs/toolkit';
import contentsReducer from '../redux/features/contentsSlice';
import { testApi } from '../redux/apis/testApi';
import cartReducer from '../redux/features/cartSlice';
import { cartsApi } from './apis/cartsApi';

export const store = configureStore({
  reducer: {
    // 실제 사용되는 이름
    // counters는 소비자 페이지인 test/page.tsx에서 useSelector(안에서 사용되는 이름)
    contents: contentsReducer,

    // testApi: testApi.reducer // 아래 코드와 동치
    // reducerPath: 'testApi' testApi를 직접 입력해도 되지만 좀 더 유연함을 위해 [testApi.reducerPath]
    cart: cartReducer,

    [testApi.reducerPath]: testApi.reducer,

    // 장바구니 createApi
    [cartsApi.reducerPath]: cartsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware, cartsApi.middleware),
});
 
// Redux 스토어의 상태 타입을 정의
// store.getState 함수는 스토어의 현재 상태를 반환하며, 이 타입은 해당 상태의 구조를 정확하게 반영
export type RootState = ReturnType<typeof store.getState>;

//  Redux 스토어의 dispatch 함수 타입을 정의
// store.dispatch 함수는 액션 객체를 전달하여 스토어의 상태를 변경하는 데 사용
export type AppDispatch = typeof store.dispatch;
