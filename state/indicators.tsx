import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GENERIC_ERROR } from "../common/error-messages";
import * as RemoteData from "../model/remote-data";
import { AppState } from "./store";

export interface Indicators {
  clientConversion: number;
  developmentConversion: number;
  doneConversion: number;
  firstMeetingConversion: number;
  negotiationConversion: number;
  performanceSDR: number;
  pocConversion: number;
  productsSold: {
    Word: number;
    Excel: number;
    PowerPoint: number;
    Outlook: number;
  };
}

export interface IndicatorsState {
  indicators: RemoteData.RemoteData<string, Indicators>;
}

const initialState: IndicatorsState = {
  indicators: RemoteData.notAsked(),
};

export const loadIndicators = createAsyncThunk<
  Indicators,
  void,
  { state: AppState }
>("indicators/loadIndicators", async (_arg, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken;
  const authFetch = (postfix: string) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${postfix}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  return {
    clientConversion: await authFetch("metrics/clientConversion") * 100,
    developmentConversion: await authFetch("metrics/developmentConversion") * 100,
    doneConversion: await authFetch("metrics/doneConversion") * 100,
    firstMeetingConversion: await authFetch("metrics/firstmeetingConversion") * 100,
    negotiationConversion: await authFetch("metrics/negotiationConversion") * 100,
    performanceSDR: await authFetch("metrics/performanceSDR"),
    pocConversion: await authFetch("metrics/pocConversion") * 100,
    productsSold: {
      Word: await authFetch("metrics/productsSold?type=WORD"),
      Excel: await authFetch("metrics/productsSold?type=EXCEL"),
      PowerPoint: await authFetch("metrics/productsSold?type=POWERPOINT"),
      Outlook: await authFetch("metrics/productsSold?type=OUTLOOK"),
    },
  };
});

const sessionSlice = createSlice({
  name: "indicators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIndicators.rejected, (state, action) => {
        state.indicators = RemoteData.error(
          action.error.message || GENERIC_ERROR
        );
      })
      .addCase(loadIndicators.pending, (state) => {
        state.indicators = RemoteData.loading();
      })
      .addCase(loadIndicators.fulfilled, (state, action) => {
        state.indicators = RemoteData.success(action.payload);
      });
  },
});

export const selectIndicators = (state: AppState) =>
  state.indicators.indicators;

export default sessionSlice.reducer;
