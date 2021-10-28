export const steps = ['Prospect', 'First meeting', 'Development', 'POC development', 'POC implementation', 'Negotiation', 'Completed'] as const;
export const companyTypes = ['Public', 'Private', 'Non profit'] as const;
export const regions = [
  "South America",
  "North America",
  "Europe",
  "Asia",
  "Africa",
] as const;
export const industries = ["Manufacture", "Heavy manufacture", "Energy", "Farmaceutical"] as const;

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

export interface OpportunityInfo {
  name: string;
  webpage: string;
  companyType: string;
  industry: Industry;
  region: Region;
  notes: string;
  step: StepType;
}

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
  nextMeeting: Date;
  notes: string;
  othersInvolved: string;
  problem: string;
  projectDate: Date;
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
  startDate: Date;
  endDate: Date;
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
  contract: {
    filename: string;
    file: File;
  };
}

export interface CancelOpportunityInfo {
  reason: string;
}