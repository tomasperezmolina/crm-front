import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Identifiable } from "../model/base";
import { OpportunityInfo, steps, StepType } from "../model/opportunity";
import * as RemoteData from "../model/remote-data";
import { NewOpportunityData } from "../pages/opportunity/new";

import type { AppState } from "./store";

export interface OpportunitiesState {
  list: RemoteData.RemoteData<string, (OpportunityInfo & Identifiable)[]>;
}

const initialState: OpportunitiesState = {
  list: RemoteData.notAsked(),
};

const mockCompany = (
  id: number,
  step: StepType
): OpportunityInfo & Identifiable => ({
  id,
  name: "MOCK S.A.",
  companyType: "Private",
  region: "North America",
  industry: "Manufacture",
  webpage: "https://formik.org/docs/api/field",
  step,
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
});

export const loadOpportunities = createAsyncThunk(
  "opportunities/loadOpportunities",
  async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
    return steps.flatMap((s, idx) => [
      mockCompany(idx * 10 + 1, s),
      mockCompany(idx * 10 + 2, s),
      mockCompany(idx * 10 + 3, s),
      mockCompany(idx * 10 + 4, s),
    ]);
  }
);

export const saveOpportunity = createAsyncThunk<
  OpportunityInfo & Identifiable,
  NewOpportunityData
>("opportunities/saveOpportunity", async (opportunity: NewOpportunityData) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
  return {
    id: Math.floor(Math.random() * 10000),
    step: "Prospect",
    ...opportunity,
  };
});

const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOpportunities.rejected, (state, action) => {
        state.list = RemoteData.error(action.error.message || "UNKNOWN_ERROR");
      })
      .addCase(loadOpportunities.pending, (state) => {
        state.list = RemoteData.loading();
      })
      .addCase(loadOpportunities.fulfilled, (state, action) => {
        state.list = RemoteData.success(action.payload);
      })
      .addCase(saveOpportunity.fulfilled, (state, action) => {
        console.log(action);
        if (state.list.state === "success") {
          state.list = RemoteData.success([
            ...state.list.value,
            action.payload,
          ]);
        }
      });
  },
});

export const selectOpportunities = (state: AppState) =>
  state.opportunities.list;

export default opportunitiesSlice.reducer;
