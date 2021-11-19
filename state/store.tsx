import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import * as ReduxPersist from "redux-persist";
import opportunitiesSlice from "./opportunities";
import snackbarSlice from "./snackbar";
import sessionSlice from "./session";
import indicatorsSlice from "./indicators";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  opportunities: opportunitiesSlice,
  snackbar: snackbarSlice,
  session: sessionSlice,
  indicators: indicatorsSlice,
});

const reducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            ReduxPersist.FLUSH,
            ReduxPersist.REHYDRATE,
            ReduxPersist.PAUSE,
            ReduxPersist.PERSIST,
            ReduxPersist.PURGE,
            ReduxPersist.REGISTER,
          ],
        },
      }),
  });
}

export const store = makeStore();
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
