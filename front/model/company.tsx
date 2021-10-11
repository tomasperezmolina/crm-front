import { Identifiable } from "./base";
import { StepType } from "./opportunity";

export const companyTypes = ["Type 1", "Type 2", "Type 3"] as const;
export const regions = [
  "South America",
  "North America",
  "Europe",
  "Asia",
  "Africa",
] as const;
export const industries = ["Industry 1", "Industry 2", "Industry 3"] as const;

export type CompanyType = typeof companyTypes[number];
export type Region = typeof regions[number];
export type Industry = typeof industries[number];

export interface CompanyForm {
  companyType: CompanyType;
  industry: Industry;
  name: string;
  notes: string;
  region: Region;
  webpage: string;
}

export interface Stepped {
  step: StepType;
}

export type Company = CompanyForm & Identifiable;


