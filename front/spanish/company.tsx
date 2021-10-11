import { CompanyType, Industry, Region } from "../model/company";

export function industryToSpanish(i: Industry) {
  switch (i) {
    case 'Industry 1': return 'Industria 1';
    case 'Industry 2': return 'Industria 2';
    case 'Industry 3': return 'Industria 3';
  }
}

export function companyTypeToSpanish(ct: CompanyType) {
  switch (ct) {
    case 'Type 1': return 'Tipo 1';
    case 'Type 2': return 'Tipo 2';
    case 'Type 3': return 'Tipo 3';
  }
}

export function regionToSpanish(r: Region) {
  switch (r) {
    case 'Africa': return 'Africa';
    case 'Asia': return 'Asia';
    case 'Europe': return 'Europa';
    case 'South America': return 'América del Sur';
    case 'North America': return 'América del Norte';
  }
}