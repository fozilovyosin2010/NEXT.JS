import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "querySlice",
  initialState: {
    queryS: "",
    //   here
    Qstatus: "",
  },

  reducers: {
    setQueryS: (state, action) => {
      state.queryS = action.payload;
    },
    setQstatus: (state, action) => {
      state.Qstatus = action.payload;
    },
  },
});

export default querySlice.reducer;
export const { setQueryS } = querySlice.actions;
