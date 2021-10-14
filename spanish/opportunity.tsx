import { StepType } from "../model/opportunity";

export function stepTypeToSpanish(s: StepType) {
  switch (s) {
    case 'Prospect': return "Prospecto";
    case 'First meeting': return 'Primera Reunión';
    case 'Development': return 'Desarrollo';
    case 'POC development': return 'Desarrollo de POC';
    case 'POC implementation': return 'Implementación de POC';
    case 'Negotiation': return 'Negociación';
    case 'Completed': return 'Completado';
  }
}