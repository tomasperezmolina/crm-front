import { Identifiable } from "../model/base";
import { OpportunityCompleted as OpportunityCompletedModel } from "../model/opportunity";

interface OpportunityCompletedProps {
    opportunity: OpportunityCompletedModel & Identifiable
  }

export default function OpportunityCompleted({opportunity}: OpportunityCompletedProps) {
    return <></>;
}