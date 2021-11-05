import { Identifiable } from "../model/base";
import { CompletedOpportunity as OpportunityCompletedModel } from "../model/opportunity";

interface OpportunityCompletedProps {
    opportunity: OpportunityCompletedModel & Identifiable
  }

export default function OpportunityCompleted({opportunity}: OpportunityCompletedProps) {
    return <></>;
}