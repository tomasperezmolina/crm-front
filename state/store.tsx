import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import opportunitiesSlice from "./opportunities";
import snackbarSlice from "./snackbar";


export function makeStore() {
  return configureStore({
    reducer: { opportunities: opportunitiesSlice, snackbar: snackbarSlice },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
