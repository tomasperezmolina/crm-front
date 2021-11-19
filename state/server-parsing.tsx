import { Identifiable } from "../model/base";
import {
  CanceledOpportunity,
  CompanyType,
  CompletedOpportunity,
  Contact,
  DevelopmentInfo,
  FirstMeetingInfo,
  Industry,
  LicenseRow,
  LicenseType,
  NegotiationInfo,
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
  Region,
  StepType,
} from "../model/opportunity";

type ServerProgram = "WORD" | "EXCEL" | "POWERPOINT" | "OUTLOOK";
type ServerLicense = "HOME" | "PRO";
type ServerStepType =
  | "PROSPECT"
  | "FIRSTMEETING"
  | "DEVELOPMENT"
  | "POCDEVELOPMENT"
  | "POCINSTALLATION"
  | "NEGOTIATION"
  | "ORDER"
  | "CANCELLED";

function toServerDate(dateString: string): string {
  return new Date(dateString).toISOString();
}

interface ServerPack {
  amount: number;
  license: ServerLicense;
  pricePerUnit: number;
  program: ServerProgram;
}

export interface ServerOpportunity {
  id: number;
  currentOwner: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    active: boolean;
    type: "ADMIN";
  };
  client: {
    id: string;
    name: string;
    webpage: string;
    industry: Industry;
    companyType: CompanyType;
    region: Region;
    notes: string;
    clientContacts: {
      email: string;
      lastName: string;
      linkedIn: string;
      name: string;
      phoneNumber: string;
    }[];
    owner: {
      id: number;
      name: string;
      lastName: string;
      email: string;
      active: true;
      type: "ADMIN";
    };
  };
  firstMeeting: {
    id: number;
    notes: string;
    projectOwner: string;
    nextMeeting: string;
    othersInvolved: string;
    problem: string;
    employeeAmount: number;
    budgetStatus: string;
    locations: string;
    projectDate: string;
    projectDuration: string;
    owner: string;
  };
  development: {
    id: number;
    principalArea: string;
    notes: string;
    packs: ServerPack[];
    owner: string;
  };
  pocDevelopment: {
    id: number;
    startDate: string;
    endDate: string;
    location: string;
    successCriteria: string;
    notes: string;
    packs: ServerPack[];
    owner: string;
  };
  pocInstallation: {
    id: number;
    notes: string;
    uxRating: number;
    processRating: number;
    owner: string;
  };
  order: {
    id: number;
    cuit: string;
    socialReason: string;
    address: string;
    paymentMethod: string;
    paymentTerms: string;
    packs: ServerPack[];
    owner: string;
  };
  cancel: {
    id: number;
    reason: string;
    prevStage: ServerStepType;
    owner: string;
  };
  stage: ServerStepType;
  doneDate: string;
}

function serverProgramParse(serverProgram: ServerProgram): ProgramType {
  switch (serverProgram) {
    case "EXCEL":
      return "Excel";
    case "OUTLOOK":
      return "Outlook";
    case "POWERPOINT":
      return "PowerPoint";
    case "WORD":
      return "Word";
  }
}

function serverLicenseParse(serverLicense: ServerLicense): LicenseType {
  switch (serverLicense) {
    case "HOME":
      return "Home";
    case "PRO":
      return "Pro";
  }
}

function serverStepParse(serverStep: ServerStepType): StepType {
  switch (serverStep) {
    case "PROSPECT":
      return "Prospect";
    case "FIRSTMEETING":
      return "First meeting";
    case "DEVELOPMENT":
      return "Development";
    case "POCDEVELOPMENT":
      return "POC development";
    case "POCINSTALLATION":
      return "POC implementation";
    case "NEGOTIATION":
      return "Negotiation";
    case "ORDER":
      return "Completed";
    case "CANCELLED":
      return "Canceled";
  }
}

function serverPackParse(serverPack: ServerPack): LicenseRow {
  return {
    amount: serverPack.amount,
    pricePerUnit: serverPack.pricePerUnit,
    program: serverProgramParse(serverPack.program),
    license: serverLicenseParse(serverPack.license),
  };
}

function opportunityInProspectFromServerOp(
  serverOp: ServerOpportunity
): OpportunityInProspect & Identifiable {
  return {
    id: serverOp.id,
    industry: serverOp.client.industry,
    name: serverOp.client.name,
    webpage: serverOp.client.webpage,
    companyType: serverOp.client.companyType,
    region: serverOp.client.region,
    notes: serverOp.client.notes,
    contact:
      serverOp.client.clientContacts.length > 0
        ? contactFromServerOp(serverOp)
        : undefined,
    step: "Prospect",
  };
}

function contactFromServerOp(serverOp: ServerOpportunity): Contact {
  return {
    name: serverOp.client.clientContacts[0].name,
    surname: serverOp.client.clientContacts[0].lastName,
    linkedin: serverOp.client.clientContacts[0].linkedIn,
    phone: serverOp.client.clientContacts[0].phoneNumber,
    email: serverOp.client.clientContacts[0].email,
  };
}

interface ContactServerForm {
  email: string;
  lastName: string;
  linkedIn: string;
  name: string;
  phoneNumber: string;
}

export function contactToServerForm(contact: Contact): ContactServerForm {
  return {
    email: contact.email,
    lastName: contact.surname,
    linkedIn: contact.linkedin,
    name: contact.name,
    phoneNumber: contact.phone,
  };
}

function opportunityInFirstMeetingFromServerOp(
  serverOp: ServerOpportunity
): OpportunityInFirstMeeting & Identifiable {
  const op = opportunityInProspectFromServerOp(serverOp);
  return {
    ...op,
    contact: contactFromServerOp(serverOp),
    firstMeetingInfo:
      serverOp.firstMeeting.notes !== null
        ? firstMeetingInfoFromServerOp(serverOp)
        : undefined,
    step: "First meeting",
  };
}

function firstMeetingInfoFromServerOp(
  serverOp: ServerOpportunity
): FirstMeetingInfo {
  return {
    budgetStatus: serverOp.firstMeeting.budgetStatus,
    employeeAmount: serverOp.firstMeeting.employeeAmount,
    locations: serverOp.firstMeeting.locations,
    nextMeetingDate: serverOp.firstMeeting.nextMeeting,
    notes: serverOp.firstMeeting.notes,
    othersInvolved: serverOp.firstMeeting.othersInvolved,
    problem: serverOp.firstMeeting.problem,
    projectDate: serverOp.firstMeeting.projectDate,
    projectDuration: serverOp.firstMeeting.projectDuration,
    projectOwner: serverOp.firstMeeting.projectOwner,
  };
}

function opportunityInDevelopmentFromServerOp(
  serverOp: ServerOpportunity
): OpportunityInDevelopment & Identifiable {
  const op = opportunityInFirstMeetingFromServerOp(serverOp);
  return {
    ...op,
    firstMeetingInfo: firstMeetingInfoFromServerOp(serverOp),
    developmentInfo:
      serverOp.development.notes !== null
        ? developmentInfoFromServerOp(serverOp)
        : undefined,
    step: "Development",
  };
}

function developmentInfoFromServerOp(
  serverOp: ServerOpportunity
): DevelopmentInfo {
  return {
    packs: serverOp.development.packs.map(serverPackParse),
    principalArea: serverOp.development.principalArea,
    notes: serverOp.development.notes,
  };
}

function opportunityInPOCDevelopmentFromServerOp(
  serverOp: ServerOpportunity
): OpportunityInPOCDevelopment & Identifiable {
  const op = opportunityInDevelopmentFromServerOp(serverOp);
  return {
    ...op,
    developmentInfo: developmentInfoFromServerOp(serverOp),
    pocDevelopmentInfo:
      serverOp.pocDevelopment.notes !== null
        ? pocDevelopmentInfoFromServerOp(serverOp)
        : undefined,
    step: "POC development",
  };
}

function pocDevelopmentInfoFromServerOp(
  serverOp: ServerOpportunity
): POCDevelopmentInfo {
  return {
    packs: serverOp.pocDevelopment.packs.map(serverPackParse),
    startDate: serverOp.pocDevelopment.startDate,
    endDate: serverOp.pocDevelopment.endDate,
    location: serverOp.pocDevelopment.location,
    successCriteria: serverOp.pocDevelopment.successCriteria,
    notes: serverOp.pocDevelopment.notes,
  };
}

function opportunityInPOCImplementationFromServerOp(
  serverOp: ServerOpportunity
): OpportunityInPOCImplementation & Identifiable {
  const op = opportunityInPOCDevelopmentFromServerOp(serverOp);
  return {
    ...op,
    pocDevelopmentInfo: pocDevelopmentInfoFromServerOp(serverOp),
    pocImplementationInfo:
      serverOp.pocInstallation.notes !== null
        ? pocImplementationInfoFromServerOp(serverOp)
        : undefined,
    step: "POC implementation",
  };
}

function pocImplementationInfoFromServerOp(
  serverOp: ServerOpportunity
): POCImplementationInfo {
  return {
    notes: serverOp.pocInstallation.notes,
    uxRating: serverOp.pocInstallation.uxRating,
    processRating: serverOp.pocInstallation.processRating,
  };
}

function opportunityInNegotiationFromServerOp(
  serverOp: ServerOpportunity
): OpportunityInNegotiation & Identifiable {
  const op = opportunityInPOCImplementationFromServerOp(serverOp);
  return {
    ...op,
    pocImplementationInfo: pocImplementationInfoFromServerOp(serverOp),
    negotiationInfo:
      serverOp.order.address !== null
        ? negotiationInfoFromServerOp(serverOp)
        : undefined,
    step: "Negotiation",
  };
}

function negotiationInfoFromServerOp(
  serverOp: ServerOpportunity
): NegotiationInfo {
  return {
    address: serverOp.order.address,
    cuit: serverOp.order.cuit,
    socialReason: serverOp.order.socialReason,
    packs: serverOp.order.packs.map(serverPackParse),
    paymentMethod: serverOp.order.paymentMethod,
    paymentTerms: serverOp.order.paymentTerms,
    contractFilename: "contract.pdf",
  };
}

function completedOpportunityFromServerOp(
  serverOp: ServerOpportunity
): CompletedOpportunity & Identifiable {
  const op = opportunityInNegotiationFromServerOp(serverOp);
  return {
    ...op,
    negotiationInfo: negotiationInfoFromServerOp(serverOp),
    step: "Completed",
  };
}

function canceledOpportunityFromServerOp(
  serverOp: ServerOpportunity
): CanceledOpportunity & Identifiable {
  const op = opportunityInProspectFromServerOp(serverOp);
  return {
    ...op,
    firstMeetingInfo:
      serverOp.firstMeeting.notes !== null
        ? firstMeetingInfoFromServerOp(serverOp)
        : undefined,
    developmentInfo:
      serverOp.development.notes !== null
        ? developmentInfoFromServerOp(serverOp)
        : undefined,
    pocDevelopmentInfo:
      serverOp.pocDevelopment.notes !== null
        ? pocDevelopmentInfoFromServerOp(serverOp)
        : undefined,
    pocImplementationInfo:
      serverOp.pocInstallation.notes !== null
        ? pocImplementationInfoFromServerOp(serverOp)
        : undefined,
    negotiationInfo:
      serverOp.order.address !== null
        ? negotiationInfoFromServerOp(serverOp)
        : undefined,
    cancellationInfo: {
      reason: serverOp.cancel.reason,
      canceledAt: serverStepParse(serverOp.cancel.prevStage),
    },
    step: "Canceled",
  };
}

export function opportunityInfoFromServerOpportunity(
  serverOp: ServerOpportunity
): OpportunityInfo & Identifiable {
  switch (serverOp.stage) {
    case "PROSPECT":
      return opportunityInProspectFromServerOp(serverOp);
    case "FIRSTMEETING":
      return opportunityInFirstMeetingFromServerOp(serverOp);
    case "DEVELOPMENT":
      return opportunityInDevelopmentFromServerOp(serverOp);
    case "POCDEVELOPMENT":
      return opportunityInPOCDevelopmentFromServerOp(serverOp);
    case "POCINSTALLATION":
      return opportunityInPOCImplementationFromServerOp(serverOp);
    case "NEGOTIATION":
      return opportunityInNegotiationFromServerOp(serverOp);
    case "ORDER":
      return completedOpportunityFromServerOp(serverOp);
    case "CANCELLED":
      return canceledOpportunityFromServerOp(serverOp);
  }
}

interface FirstMeetingServerForm {
  employeeAmount: number;
  projectDuration: string;
  budgetStatus: string;
  locations: string;
  nextMeeting: string;
  notes: string;
  othersInvolved: string;
  problem: string;
  projectDate: string;
  projectOwner: string;
}

export function firstMeetingInfoToServerForm(
  info: FirstMeetingInfo
): FirstMeetingServerForm {
  return {
    employeeAmount: info.employeeAmount,
    projectDuration: info.projectDuration,
    budgetStatus: info.budgetStatus,
    locations: info.locations,
    nextMeeting: toServerDate(info.nextMeetingDate),
    notes: info.notes,
    othersInvolved: info.othersInvolved,
    problem: info.problem,
    projectDate: toServerDate(info.projectDate),
    projectOwner: info.projectOwner,
  };
}

interface DevelopmentServerForm {
  notes: string;
  packs: ServerPack[];
  principalArea: string;
}

function programTypeToServer(program: ProgramType): ServerProgram {
  switch (program) {
    case "Word":
      return "WORD";
    case "PowerPoint":
      return "POWERPOINT";
    case "Outlook":
      return "OUTLOOK";
    case "Excel":
      return "EXCEL";
  }
}

function licenseToServer(license: LicenseType): ServerLicense {
  switch (license) {
    case "Pro":
      return "PRO";
    case "Home":
      return "HOME";
  }
}

function licenseRowToServerPack(licenseRow: LicenseRow): ServerPack {
  return {
    pricePerUnit: licenseRow.pricePerUnit,
    program: programTypeToServer(licenseRow.program),
    license: licenseToServer(licenseRow.license),
    amount: licenseRow.amount,
  };
}

export function developmentInfoToServerForm(
  info: DevelopmentInfo
): DevelopmentServerForm {
  return {
    notes: info.notes,
    packs: info.packs.map(licenseRowToServerPack),
    principalArea: info.principalArea,
  };
}

interface POCDevelopmentForm {
  endDate: string;
  location: string;
  notes: string;
  startDate: string;
  successCriteria: string;
  packs: ServerPack[];
}

export function pocDevelopmentInfoToServerForm(
  info: POCDevelopmentInfo
): POCDevelopmentForm {
  return {
    ...info,
    startDate: toServerDate(info.startDate),
    endDate: toServerDate(info.endDate),
    packs: info.packs.map(licenseRowToServerPack),
  };
}

interface OrderForm {
  address: string;
  cuit: string;
  paymentMethod: string;
  paymentTerms: string;
  socialReason: string;
  packs: ServerPack[];
}

export function negotiationInfoToOrderForm(info: NegotiationInfo): OrderForm {
  return {
    ...info,
    packs: info.packs.map(licenseRowToServerPack),
  };
}
