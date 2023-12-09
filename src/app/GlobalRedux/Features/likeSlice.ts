import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";


export const asyncLikeState: any = createAsyncThunk(
  'likeSlice/asyncLike',
  async (id: string) => {
    try {
      const db = (await connectDB).db('frankenshop');
      const result = await db.collection('contents').findOne({ _id: new ObjectId(id) });
      return result;
    } catch(error) {
      throw error
    }
  }
)

export interface likeState {
  likeState: boolean;
}

const initialState: likeState = {
  likeState: false
}

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    likeToggle: (state) => {
      state.likeState = !state.likeState
    }
  },
  extraReducers(builder) {
    builder.addCase(asyncLikeState.fulfilled, (state, action) => {
      // 서버에서 받아온 값(action.payload)으로 업데이트
      state.likeState = action.payload
    })
  },
})

// 액션 생성자를 사용할 수 있도록
export const { likeToggle } = likeSlice.actions;

// Redux 스토어에서 사용할 리듀서 함수를 제공하는 것
export default likeSlice.reducer;