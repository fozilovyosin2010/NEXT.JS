import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    openAdd: false,
  },
  reducers: {
    setModal: (s, a) => {
      if (a.payload[1] === "add") {
        s.openAdd = a.payload[0];
      }
    },
  },
});

export default uiSlice.reducer;

export const { setModal } = uiSlice.actions;
