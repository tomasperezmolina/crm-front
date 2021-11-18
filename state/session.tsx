import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "next-auth";


export interface SnackbarState {
  session: Session | null;
}

const initialState: SnackbarState = {
  session: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<Session | null>
    ) => { 
      state.session = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;

export default sessionSlice.reducer;