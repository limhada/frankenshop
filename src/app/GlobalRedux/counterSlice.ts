import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// thunk 테스트
export const asyncAxios: any = createAsyncThunk(
  // 아무 이름이나 적어도 되지만 의미를 통일하여 가독성 좋게 작성하기!
  'counterSlice/asyncUpFetch',
  async () => {
    const { data } = await axios.get('/api/test/test');
    return data;
  }
);


export interface CounterState {
  value: number;
  status?: string;
  value2: any;
}

const initialState: CounterState = {
  value: 0,
  status: '초기상태',
  value2: '',
};

export const counterSlice = createSlice({
  // 리덕스 툴킷이 createSlice() 함수를 호출할 때 필요한 이름
  // 실제로 사용되는 이름은 아님!
  // store의 이름과 같은 이름을 사용하는게 가독성이 좋음
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state1) => {
      state1.value -= 1;
    },
    incrementByAmount: (state2, action) => {
      state2.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncAxios.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(asyncAxios.fulfilled, (state, action) => {
      state.status = 'complete';
      
      // => 서버에서 받아온 값(현재는 20임)
      state.value2 = action.payload; 

      // => 서버에서 받아온 값(현재는 20임) + 현재 1번 slice값(지금 기본 0)
      // state.value2 = action.payload + state.value;
    });
    builder.addCase(asyncAxios.rejected, (state, action) => {
      state.status = 'fail';
    });
  },
});

// counterSlice의 액션 생성자를 내보내는 코드
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// counterSlice의 리듀서를 내보내는 코드
// export default counterSlice.reducers; 대신 export default counterSlice.reducer;를 사용하는 이유
// createSlice 함수는 reducers 속성을 받지만, 실제로 내보내는 것은 단일 reducer 함수입니다. 이 함수는 reducers 속성에 정의된 각 리듀서 함수를 결합하여 하나의 함수로 만든 것
export default counterSlice.reducer;
// counterSlice.reducers는 객체이기 때문에 에러 발생!

// export { asyncAxios }
