import * as Messages from "../common/error-messages";

export function errorMessageToSpanish(errorMessage: string) {
  switch (errorMessage) {
    case Messages.OPPORTUNITY_NOT_FOUND:
      return "No se encontró la oportunidad";
    case Messages.DEVELOPMENT_DATA_MISSING:
      return "Faltan cargar los datos de desarrollo";
    case Messages.FIRST_MEETING_DATA_MISSING:
      return "Faltan cargar los datos de primera reunión";
    case Messages.INVALID_SOURCE_STEP:
      return "No es posible avanzar al siguiente paso";
    case Messages.NEGOTIATION_DATA_MISSING:
      return "Faltan cargar los datos de negociación";
    case Messages.POC_DEVELOPMENT_DATA_MISSING:
      return "Faltan cargar los datos de desarrollo de POC";
    case Messages.POC_IMPLEMENTATION_DATA_MISSING:
      return "Faltan cargar los datos de implementación de POC";
    case Messages.PROSPECT_DATA_MISSING:
      return "Faltan cargar los datos de prospecto";
  }
}
