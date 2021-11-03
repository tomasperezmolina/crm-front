import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorMessageToSpanish as messageToSpanish } from "../spanish/error-messages";
import { AppState } from "./store";


export interface SnackbarState {
  message?: string;
  type?: AlertColor;
  open: boolean;
}

const initialState: SnackbarState = {
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (
      state,
      action: PayloadAction<{ msg: string; type?: AlertColor }>
    ) => {
      state.open = true;
      state.type = action.payload.type ?? "info";
      state.message = messageToSpanish(action.payload.msg);
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: AppState) => state.snackbar;

export default snackbarSlice.reducer;
