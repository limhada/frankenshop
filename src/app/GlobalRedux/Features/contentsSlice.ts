import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const asyncContents: any = createAsyncThunk(
  'contentsSlice/asynContents',
  async () => {
    try{
      const { data } = await axios.get(`/api/contents/allContents`)
      return data
    } catch (error) {
      throw error
    }
  }
)

const initialState = {
  data: [],
};

export const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(asyncContents.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },

})

// export const {} = contentsSlice.actions
export default contentsSlice.reducer;