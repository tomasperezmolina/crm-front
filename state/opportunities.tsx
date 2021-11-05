import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  INVALID_SOURCE_STEP,
  OPPORTUNITY_NOT_FOUND,
} from "../common/error-messages";
import { Identifiable } from "../model/base";
import {
  BaseOpportunityInfo,
  Contact,
  DevelopmentInfo,
  FirstMeetingInfo,
  LicenseType,
  NegotiationInfo,
  OpportunityCompleted,
  OpportunityInDevelopment,
  OpportunityInFirstMeeting,
  OpportunityInfo,
  OpportunityInNegotiation,
  OpportunityInPOCDevelopment,
  OpportunityInPOCImplementation,
  OpportunityInProspect,
  POCDevelopmentInfo,
  POCImplementationInfo,
  ProgramType,
  steps,
  StepType,
} from "../model/opportunity";
import { licensePrice } from "../model/pricing";
import * as RemoteData from "../model/remote-data";
import { NewOpportunityData } from "../pages/opportunity/new";

import type { AppState } from "./store";

export interface OpportunitiesState {
  list: RemoteData.RemoteData<string, (OpportunityInfo & Identifiable)[]>;
}

const initialState: OpportunitiesState = {
  list: RemoteData.notAsked(),
};

function generateId() {
  return Math.floor(Math.random() * 10000);
}

function mockProspectCompany(
  name: string
): OpportunityInProspect & Identifiable {
  return {
    id: generateId(),
    name,
    companyType: "Private",
    region: "North America",
    industry: "Manufacture",
    webpage: "https://formik.org/docs/api/field",
    step: "Prospect",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
  };
}

function mockFirstMeetingCompany(
  name: string
): OpportunityInFirstMeeting & Identifiable {
  return {
    ...mockProspectCompany(name),
    step: "First meeting",
    contact: {
      name: "Pedro",
      surname: "Perez",
      email: "perez@mail.com",
      linkedin: `https://www.linkedin.com/in/pedro-perez-0a${generateId()}/`,
      phone: "01161513562",
    },
  };
}

function mockDevelopmentCompany(
  name: string
): OpportunityInDevelopment & Identifiable {
  return {
    ...mockFirstMeetingCompany(name),
    step: "Development",
    firstMeetingInfo: {
      problem: "Un problema complicado",
      budgetStatus:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
      employeeAmount: 200,
      locations: "Buenos Aires, Santa Fe, CABA",
      nextMeetingDate: moment().add(1, "week").toISOString(),
      projectDate: moment().add(3, "months").toISOString(),
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
      projectOwner: "Marty McFly",
      othersInvolved: "Jeff Bezos, Elon Musk",
      projectDuration: "Q4 2022",
    },
  };
}

function mockPack(program: ProgramType, license: LicenseType, amount: number) {
  return {
    license,
    program,
    pricePerUnit: licensePrice(program, license),
    amount: amount,
  };
}

function mockPOCDevelopmentCompany(
  name: string
): OpportunityInPOCDevelopment & Identifiable {
  return {
    ...mockDevelopmentCompany(name),
    step: "POC development",
    developmentInfo: {
      principalArea: "Recursos Humanos",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
      packs: [
        mockPack("Excel", "Home", 20),
        mockPack("Word", "Pro", 10),
        mockPack("Excel", "Pro", 50),
        mockPack("Outlook", "Home", 80),
      ],
    },
  };
}

function mockPOCImplementationCompany(
  name: string
): OpportunityInPOCImplementation & Identifiable {
  return {
    ...mockPOCDevelopmentCompany(name),
    step: "POC implementation",
    pocDevelopmentInfo: {
      packs: [
        mockPack("Excel", "Home", 5),
        mockPack("Excel", "Pro", 2),
        mockPack("Word", "Home", 10),
        mockPack("Word", "Pro", 5),
        mockPack("Outlook", "Home", 2),
      ],
      startDate: moment().add(3, "weeks").toISOString(),
      endDate: moment().add(3, "weeks").add(1, "month").toISOString(),
      location: "San Martín 2405, Capital Federal",
      successCriteria:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
    },
  };
}

function mockNegotiationCompany(
  name: string
): OpportunityInNegotiation & Identifiable {
  return {
    ...mockPOCImplementationCompany(name),
    step: "Negotiation",
    pocImplementationInfo: {
      uxRating: 4,
      processRating: 5,
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero.",
    },
  };
}

export const loadOpportunities = createAsyncThunk(
  "opportunities/loadOpportunities",
  async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
    return [
      mockProspectCompany("Danone"),
      mockProspectCompany("Accenture"),
      mockProspectCompany("Serenísima"),
      mockProspectCompany("Bayer"),
      mockFirstMeetingCompany("Freddo"),
      mockFirstMeetingCompany("Salesforce"),
      mockFirstMeetingCompany("Drixit"),
      mockDevelopmentCompany("Tesla"),
      mockDevelopmentCompany("Microsoft"),
      mockDevelopmentCompany("Apple"),
      mockDevelopmentCompany("Dell"),
      mockDevelopmentCompany("Coca-Cola"),
      mockDevelopmentCompany("ASUS"),
      mockPOCDevelopmentCompany("Discord"),
      mockPOCDevelopmentCompany("Unilever"),
      mockPOCImplementationCompany("Logitech"),
      mockPOCImplementationCompany("PepsiCo"),
      mockPOCImplementationCompany("Nike"),
      mockPOCImplementationCompany("ZARA"),
      mockPOCImplementationCompany("Yamaha"),
      mockPOCImplementationCompany("Yamaha"),
      mockNegotiationCompany("Aukey"),
      mockNegotiationCompany("GUESS"),
      mockNegotiationCompany("LG"),
      mockNegotiationCompany("Adidas"),
      mockNegotiationCompany("Blizzard"),
    ];
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
    id: generateId(),
    step: "Prospect",
    ...opportunity,
  };
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
  Omit<OpportunityCompleted, keyof BaseOpportunityInfo>,
  "step"
>;

function saveElement<T extends ElementKeys>(
  state: OpportunitiesState,
  id: number,
  elementKey: T,
  element: OpportunityCompleted[T]
) {
  return RemoteData.map(state.list, (os) => {
    const { element: o, indexOf } = findWithIndex(os, (o) => o.id === id);
    if (!o) throw new Error(OPPORTUNITY_NOT_FOUND);
    const newOpportunities = [...os];
    newOpportunities[indexOf] = {
      ...o,
      [elementKey]: element,
    };
    return newOpportunities;
  });
}

function stateTransition(
  state: OpportunitiesState,
  id: number,
  target: StepType,
  elementKey: ElementKeys
) {
  return RemoteData.map(state.list, (os) => {
    const { element: o, indexOf } = findWithIndex(os, (o) => o.id === id);
    if (!o) throw new Error(OPPORTUNITY_NOT_FOUND);
    if (o.step !== steps[steps.indexOf(target) - 1])
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
  reducers: {
    saveOpportunityContact: (
      state,
      action: PayloadAction<{ id: number; contact: Contact }>
    ) => {
      state.list = saveElement(
        state,
        action.payload.id,
        "contact",
        action.payload.contact
      );
    },
    sendOpportunityToFirstMeeting: (state, action: PayloadAction<number>) => {
      state.list = stateTransition(
        state,
        action.payload,
        "First meeting",
        "contact"
      );
    },
    saveOpportunityFirstMeetingInfo: (
      state,
      action: PayloadAction<{ id: number; info: FirstMeetingInfo }>
    ) => {
      state.list = saveElement(
        state,
        action.payload.id,
        "firstMeetingInfo",
        action.payload.info
      );
    },
    sendOpportunityToDevelopment: (state, action: PayloadAction<number>) => {
      state.list = stateTransition(
        state,
        action.payload,
        "Development",
        "firstMeetingInfo"
      );
    },
    saveOpportunityDevelopmentInfo: (
      state,
      action: PayloadAction<{ id: number; info: DevelopmentInfo }>
    ) => {
      state.list = saveElement(
        state,
        action.payload.id,
        "developmentInfo",
        action.payload.info
      );
    },
    sendOpportunityToPOCDevelopment: (state, action: PayloadAction<number>) => {
      state.list = stateTransition(
        state,
        action.payload,
        "POC development",
        "developmentInfo"
      );
    },
    saveOpportunityPOCDevelopmentInfo: (
      state,
      action: PayloadAction<{ id: number; info: POCDevelopmentInfo }>
    ) => {
      state.list = saveElement(
        state,
        action.payload.id,
        "pocDevelopmentInfo",
        action.payload.info
      );
    },
    sendOpportunityToPOCImplementation: (
      state,
      action: PayloadAction<number>
    ) => {
      state.list = stateTransition(
        state,
        action.payload,
        "POC implementation",
        "pocDevelopmentInfo"
      );
    },
    saveOpportunityPOCImplementationInfo: (
      state,
      action: PayloadAction<{ id: number; info: POCImplementationInfo }>
    ) => {
      state.list = saveElement(
        state,
        action.payload.id,
        "pocImplementationInfo",
        action.payload.info
      );
    },
    sendOpportunityToNegotiation: (state, action: PayloadAction<number>) => {
      state.list = stateTransition(
        state,
        action.payload,
        "Negotiation",
        "pocImplementationInfo"
      );
    },
    saveOpportunityNegotiationInfo: (
      state,
      action: PayloadAction<{ id: number; info: NegotiationInfo }>
    ) => {
      state.list = saveElement(
        state,
        action.payload.id,
        "negotiationInfo",
        action.payload.info
      );
    },
    completeOpportunity: (state, action: PayloadAction<number>) => {
      state.list = stateTransition(
        state,
        action.payload,
        "Completed",
        "negotiationInfo"
      );
    },
  },
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
        if (state.list.state === "success") {
          state.list = RemoteData.success([
            ...state.list.value,
            action.payload,
          ]);
        }
      });
  },
});

export const {
  saveOpportunityContact,
  saveOpportunityDevelopmentInfo,
  saveOpportunityFirstMeetingInfo,
  saveOpportunityNegotiationInfo,
  saveOpportunityPOCDevelopmentInfo,
  saveOpportunityPOCImplementationInfo,
  sendOpportunityToFirstMeeting,
  sendOpportunityToDevelopment,
  sendOpportunityToNegotiation,
  sendOpportunityToPOCDevelopment,
  sendOpportunityToPOCImplementation,
  completeOpportunity,
} = opportunitiesSlice.actions;

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
        return RemoteData.error("OPPORTUNITY_NOT_FOUND");
      }
    });

export default opportunitiesSlice.reducer;
