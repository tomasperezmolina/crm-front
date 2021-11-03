import { CompanyType, Industry, Region } from "../model/opportunity";

export function industryToSpanish(i: Industry) {
  switch (i) {
    case 'Manufacture': return 'Manufactura';
    case 'Heavy manufacture': return 'Manufactura pesada';
    case 'Farmaceutical': return 'Farmacéutica';
    case 'Energy': return 'Energía';
  }
}

export function companyTypeToSpanish(ct: CompanyType) {
  switch (ct) {
    case 'Non profit': return 'Sin fines de lucro';
    case 'Private': return 'Privada';
    case 'Public': return 'Pública';
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