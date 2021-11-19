import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  DEVELOPMENT_DATA_MISSING,
  FIRST_MEETING_DATA_MISSING,
  GENERIC_ERROR,
  INVALID_SOURCE_STEP,
  NEGOTIATION_DATA_MISSING,
  OPPORTUNITY_NOT_FOUND,
  POC_DEVELOPMENT_DATA_MISSING,
  POC_IMPLEMENTATION_DATA_MISSING,
  PROSPECT_DATA_MISSING,
} from "../common/error-messages";
import { Identifiable } from "../model/base";
import {
  BaseOpportunityInfo,
  Contact,
  DevelopmentInfo,
  FirstMeetingInfo,
  NegotiationInfo,
  OpportunityInfo,
  POCDevelopmentInfo,
  POCImplementationInfo,
  steps,
  StepType,
  CanceledOpportunity,
  CancelOpportunityForm,
  OpportunityInFirstMeeting,
  OpportunityInDevelopment,
  OpportunityInPOCDevelopment,
  OpportunityInPOCImplementation,
  OpportunityInNegotiation,
} from "../model/opportunity";
import * as RemoteData from "../model/remote-data";
import { NewOpportunityData } from "../pages/opportunity/new";
import {
  contactToServerForm,
  developmentInfoToServerForm,
  firstMeetingInfoToServerForm,
  negotiationInfoToOrderForm,
  opportunityInfoFromServerOpportunity,
  pocDevelopmentInfoToServerForm,
  ServerOpportunity,
} from "./server-parsing";
import { openSnackbar } from "./snackbar";

import type { AppState } from "./store";

export interface OpportunitiesState {
  list: RemoteData.RemoteData<string, (OpportunityInfo & Identifiable)[]>;
}

const initialState: OpportunitiesState = {
  list: RemoteData.notAsked(),
};

export const loadOpportunities = createAsyncThunk<
  (OpportunityInfo & Identifiable)[],
  void,
  { state: AppState }
>("opportunities/loadOpportunities", async (_arg, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken;
  const getResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!getResponse.ok) throw new Error(GENERIC_ERROR);
  return (await getResponse.json()).map(opportunityInfoFromServerOpportunity);
});

async function fetchOpportunity(token: string, id: number) {
  const getResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!getResponse.ok) throw new Error(GENERIC_ERROR);
  const serverOpportunity: ServerOpportunity = await getResponse.json();
  return opportunityInfoFromServerOpportunity(serverOpportunity);
}

export const saveOpportunity = createAsyncThunk<
  OpportunityInfo & Identifiable,
  NewOpportunityData,
  { state: AppState }
>("opportunities/saveOpportunity", async (opportunity, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken;
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opportunity),
    }
  );
  if (!createResponse.ok) throw new Error(GENERIC_ERROR);
  const getResponse = await fetch(createResponse.headers.get("Location")!, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const serverOpportunity: ServerOpportunity = await getResponse.json();
  return opportunityInfoFromServerOpportunity(serverOpportunity);
});

export const saveOpportunityContact = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; contact: Contact },
  { state: AppState }
>("opportunities/saveOpportunityContact", async (payload, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken as string;
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/clientcontact`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactToServerForm(payload.contact)),
    }
  );
  if (!createResponse.ok) throw new Error(GENERIC_ERROR);
  return await fetchOpportunity(token, payload.id);
});

export const saveOpportunityFirstMeetingInfo = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; info: FirstMeetingInfo },
  { state: AppState }
>(
  "opportunities/saveOpportunityFirstMeetingInfo",
  async (payload, thunkApi) => {
    const token = thunkApi.getState().session.session?.accessToken as string;
    const createResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/firstmeeting`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firstMeetingInfoToServerForm(payload.info)),
      }
    );
    if (!createResponse.ok) throw new Error(GENERIC_ERROR);
    return await fetchOpportunity(token, payload.id);
  }
);

export const saveOpportunityDevelopmentInfo = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; info: DevelopmentInfo },
  { state: AppState }
>("opportunities/saveOpportunityDevelopmentInfo", async (payload, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken as string;
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/development`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(developmentInfoToServerForm(payload.info)),
    }
  );
  if (!createResponse.ok) throw new Error(GENERIC_ERROR);
  return await fetchOpportunity(token, payload.id);
});

export const saveOpportunityPOCDevelopmentInfo = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; info: POCDevelopmentInfo },
  { state: AppState }
>(
  "opportunities/saveOpportunityPOCDevelopmentInfo",
  async (payload, thunkApi) => {
    const token = thunkApi.getState().session.session?.accessToken as string;
    const createResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/pocdevelopment`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pocDevelopmentInfoToServerForm(payload.info)),
      }
    );
    if (!createResponse.ok) throw new Error(GENERIC_ERROR);
    return await fetchOpportunity(token, payload.id);
  }
);

export const saveOpportunityPOCImplementationInfo = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; info: POCImplementationInfo },
  { state: AppState }
>(
  "opportunities/saveOpportunityPOCImplementationInfo",
  async (payload, thunkApi) => {
    const token = thunkApi.getState().session.session?.accessToken as string;
    const createResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/pocinstallation`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.info),
      }
    );
    if (!createResponse.ok) throw new Error(GENERIC_ERROR);
    return await fetchOpportunity(token, payload.id);
  }
);

export const saveOpportunityNegotiationInfo = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; info: NegotiationInfo },
  { state: AppState }
>("opportunities/saveOpportunityNegotiationInfo", async (payload, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken as string;
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/order`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(negotiationInfoToOrderForm(payload.info)),
    }
  );
  if (!createResponse.ok) throw new Error(GENERIC_ERROR);
  return await fetchOpportunity(token, payload.id);
});

export const cancelOpportunity = createAsyncThunk<
  OpportunityInfo & Identifiable,
  { id: number; info: CancelOpportunityForm },
  { state: AppState }
>("opportunities/cancelOpportunity", async (payload, thunkApi) => {
  const token = thunkApi.getState().session.session?.accessToken as string;
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.info),
    }
  );
  if (!createResponse.ok) throw new Error(GENERIC_ERROR);
  return await fetchOpportunity(token, payload.id);
});

export const advanceOpportunityStage = createAsyncThunk<
  OpportunityInfo & Identifiable,
  OpportunityInfo & Identifiable,
  { state: AppState }
>("opportunities/advanceOpportunityStage", async (payload, thunkApi) => {
  try {
    switch (payload.step) {
      case "Prospect":
        if (!payload.contact) throw new Error(PROSPECT_DATA_MISSING);
      case "First meeting":
        if (!(payload as OpportunityInFirstMeeting).firstMeetingInfo)
          throw new Error(FIRST_MEETING_DATA_MISSING);
      case "Development":
        if (!(payload as OpportunityInDevelopment).developmentInfo)
          throw new Error(DEVELOPMENT_DATA_MISSING);
      case "POC development":
        if (!(payload as OpportunityInPOCDevelopment).pocDevelopmentInfo)
          throw new Error(POC_DEVELOPMENT_DATA_MISSING);
      case "POC implementation":
        if (!(payload as OpportunityInPOCImplementation).pocImplementationInfo)
          throw new Error(POC_IMPLEMENTATION_DATA_MISSING);
      case "Negotiation":
        if (!(payload as OpportunityInNegotiation).negotiationInfo)
          throw new Error(NEGOTIATION_DATA_MISSING);
    }
    const session = thunkApi.getState().session.session!;
    const token = session.accessToken as string;
    const userId = session.id as number;
    const createResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/opportunity/${payload.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newOwner: userId }),
      }
    );
    if (!createResponse.ok) throw new Error(GENERIC_ERROR);
    return await fetchOpportunity(token, payload.id);
  } catch (e: any) {
    thunkApi.dispatch(openSnackbar({ msg: e.message, type: "error" }));
    throw e;
  }
});

function findWithIndex<T>(
  list: readonly T[],
  predicate: (value: T, index: number, obj: readonly T[]) => unknown
) {
  let indexOf = -1;
  const element = list.find((value, index, obj) => {
    const matches = predicate(value, index, obj);
    if (matches) indexOf = index;
    return matches;
  });
  return { element, indexOf };
}

type ElementKeys = keyof Omit<
  Omit<CanceledOpportunity, keyof BaseOpportunityInfo>,
  "step"
>;

function stateTransition(
  state: OpportunitiesState,
  id: number,
  target: StepType,
  elementKey: ElementKeys
) {
  return RemoteData.map(state.list, (os) => {
    const { element: o, indexOf } = findWithIndex(os, (o) => o.id === id);
    if (!o) throw new Error(OPPORTUNITY_NOT_FOUND);
    if (target !== "Canceled" && o.step !== steps[steps.indexOf(target) - 1])
      throw new Error(INVALID_SOURCE_STEP);
    // @ts-ignore
    if (!o[elementKey])
      throw new Error(`${o.step.toUpperCase().replace(" ", "_")}_DATA_MISSING`);
    const newOpportunities = [...os];
    // @ts-ignore
    newOpportunities[indexOf] = {
      ...o,
      step: target,
    };
    return newOpportunities;
  });
}

const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOpportunities.rejected, (state, action) => {
        state.list = RemoteData.error(action.error.message || GENERIC_ERROR);
      })
      .addCase(loadOpportunities.pending, (state) => {
        state.list = RemoteData.loading();
      })
      .addCase(loadOpportunities.fulfilled, (state, action) => {
        state.list = RemoteData.success(action.payload);
      })
      .addCase(saveOpportunity.fulfilled, (state, action) => {
        if (state.list.state === "success") {
          state.list = RemoteData.success([
            ...state.list.value,
            action.payload,
          ]);
        }
      })
      .addMatcher(
        isFulfilled(
          saveOpportunityContact,
          saveOpportunityDevelopmentInfo,
          saveOpportunityPOCDevelopmentInfo,
          saveOpportunityPOCImplementationInfo,
          saveOpportunityNegotiationInfo,
          cancelOpportunity,
          advanceOpportunityStage
        ),
        (state, action) => {
          updateOpportunityInState(state, action);
        }
      );
  },
});

export const selectOpportunities = (state: AppState) =>
  state.opportunities.list;

export const selectOpportunity =
  (id: number) =>
  (
    state: AppState
  ): RemoteData.RemoteData<string, OpportunityInfo & Identifiable> =>
    RemoteData.andThen(state.opportunities.list, (os) => {
      const opportunity = os.find((o) => o.id === id);
      if (opportunity) return RemoteData.success(opportunity);
      else {
        return RemoteData.error(OPPORTUNITY_NOT_FOUND);
      }
    });

export default opportunitiesSlice.reducer;

function updateOpportunityInState(
  state: OpportunitiesState,
  action: PayloadAction<OpportunityInfo & Identifiable, string>
) {
  if (state.list.state === "success") {
    const { indexOf } = findWithIndex(
      state.list.value,
      (o) => o.id === action.payload.id
    );
    if (indexOf === -1) throw new Error(OPPORTUNITY_NOT_FOUND);
    const newList = [...state.list.value];
    newList[indexOf] = action.payload;
    state.list = RemoteData.success(newList);
  }
}
