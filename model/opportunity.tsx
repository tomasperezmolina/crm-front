export const steps = [
  "Prospect",
  "First meeting",
  "Development",
  "POC development",
  "POC implementation",
  "Negotiation",
  "Completed",
  "Canceled",
] as const;
export const companyTypes = ["Public", "Private", "Non profit"] as const;
export const regions = [
  "South America",
  "North America",
  "Europe",
  "Asia",
  "Africa",
] as const;
export const industries = [
  "Manufacture",
  "Heavy manufacture",
  "Energy",
  "Farmaceutical",
] as const;

export type CompanyType = typeof companyTypes[number];
export type Region = typeof regions[number];
export type Industry = typeof industries[number];
export type StepType = typeof steps[number];

export const programTypes = ["Word", "Excel", "PowerPoint", "Outlook"] as const;
export type ProgramType = typeof programTypes[number];

export const licenseTypes = ["Home", "Pro"] as const;
export type LicenseType = typeof licenseTypes[number];

export interface LicenseRow {
  program: ProgramType;
  license: LicenseType;
  amount: number;
  pricePerUnit: number;
}

export interface BaseOpportunityInfo {
  name: string;
  webpage: string;
  companyType: CompanyType;
  industry: Industry;
  region: Region;
  notes: string;
}

export type OpportunityInProspect = BaseOpportunityInfo & {
  step: typeof steps[0];
  contact?: Contact;
};

export type OpportunityInFirstMeeting = BaseOpportunityInfo & {
  step: typeof steps[1];
  contact: Contact;
  firstMeetingInfo?: FirstMeetingInfo;
};

export type OpportunityInDevelopment = BaseOpportunityInfo & {
  step: typeof steps[2];
  contact: Contact;
  firstMeetingInfo: FirstMeetingInfo;
  developmentInfo?: DevelopmentInfo;
};

export type OpportunityInPOCDevelopment = BaseOpportunityInfo & {
  step: typeof steps[3];
  contact: Contact;
  firstMeetingInfo: FirstMeetingInfo;
  developmentInfo: DevelopmentInfo;
  pocDevelopmentInfo?: POCDevelopmentInfo;
};

export type OpportunityInPOCImplementation = BaseOpportunityInfo & {
  step: typeof steps[4];
  contact: Contact;
  firstMeetingInfo: FirstMeetingInfo;
  developmentInfo: DevelopmentInfo;
  pocDevelopmentInfo: POCDevelopmentInfo;
  pocImplementationInfo?: POCImplementationInfo;
};

export type OpportunityInNegotiation = BaseOpportunityInfo & {
  step: typeof steps[5];
  contact: Contact;
  firstMeetingInfo: FirstMeetingInfo;
  developmentInfo: DevelopmentInfo;
  pocDevelopmentInfo: POCDevelopmentInfo;
  pocImplementationInfo: POCImplementationInfo;
  negotiationInfo?: NegotiationInfo;
};

export type CompletedOpportunity = BaseOpportunityInfo & {
  step: typeof steps[6];
  contact: Contact;
  firstMeetingInfo: FirstMeetingInfo;
  developmentInfo: DevelopmentInfo;
  pocDevelopmentInfo: POCDevelopmentInfo;
  pocImplementationInfo: POCImplementationInfo;
  negotiationInfo: NegotiationInfo;
};

export type CanceledOpportunity = BaseOpportunityInfo & {
  step: typeof steps[7];
  contact?: Contact;
  firstMeetingInfo?: FirstMeetingInfo;
  developmentInfo?: DevelopmentInfo;
  pocDevelopmentInfo?: POCDevelopmentInfo;
  pocImplementationInfo?: POCImplementationInfo;
  negotiationInfo?: NegotiationInfo;
  cancellationInfo: CancelOpportunityInfo;
};

export type OpportunityInfo =
  | OpportunityInProspect
  | OpportunityInFirstMeeting
  | OpportunityInDevelopment
  | OpportunityInPOCDevelopment
  | OpportunityInPOCImplementation
  | OpportunityInNegotiation
  | CompletedOpportunity
  | CanceledOpportunity;

export interface Contact {
  name: string;
  surname: string;
  email: string;
  linkedin: string;
  phone: string;
}

export interface FirstMeetingInfo {
  budgetStatus: string;
  employeeAmount: number;
  locations: string;
  nextMeetingDate: string;
  notes: string;
  othersInvolved: string;
  problem: string;
  projectDate: string;
  projectDuration: string;
  projectOwner: string;
}

export interface DevelopmentInfo {
  packs: LicenseRow[];
  principalArea: string;
  notes: string;
}

export interface POCDevelopmentInfo {
  packs: LicenseRow[];
  startDate: string;
  endDate: string;
  location: string;
  successCriteria: string;
  notes: string;
}

export interface POCImplementationInfo {
  notes: string;
  uxRating: number;
  processRating: number;
}

export interface NegotiationInfo {
  address: string;
  cuit: string;
  socialReason: string;
  packs: LicenseRow[];
  paymentMethod: string;
  paymentTerms: string;
  contract?: {
    filename: string;
    file: File;
  };
}

export interface CancelOpportunityInfo {
  reason: string;
}
