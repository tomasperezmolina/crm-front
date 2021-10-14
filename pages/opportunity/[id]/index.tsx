import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { steps, StepType } from "../../../model/opportunity";
import { stepTypeToSpanish } from "../../../spanish/opportunity";
import { Stepped } from "../../../model/company";
import {
  OpportunityProspect,
  OpportunityFirstMeeting,
  OpportunityDevelopment,
  OpportunityPOCDevelopment,
  OpportunityPOCImplementation,
  OpportunityNegotiation,
} from "../../../opportunity";

interface OpportunityProps {
  id?: string;
}

const mockOpportunity: Stepped = {
  step: "Prospect",
};

const renderStage = (stage: StepType) => {
  switch (stage) {
    case "Prospect":
      return <OpportunityProspect />;
    case "First meeting":
      return <OpportunityFirstMeeting />;
    case "Development":
      return <OpportunityDevelopment />;
    case "POC development":
      return <OpportunityPOCDevelopment />;
    case "POC implementation":
      return <OpportunityPOCImplementation />;
    case "Negotiation":
      return <OpportunityNegotiation />;
  }
};

const Opportunity: NextPage<OpportunityProps> = ({ id }) => {
  const [activeStep, setActiveStep] = React.useState(
    steps.indexOf(mockOpportunity.step)
  );
  const [opportunity, setOpportunity] = React.useState(mockOpportunity);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return steps.indexOf(opportunity.step) + 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setOpportunity({ step: steps[steps.indexOf(opportunity.step) + 1] });
    handleNext();
  };

  const stepIsCompleted = (stepIndex: number) => {
    return stepIndex < steps.indexOf(opportunity.step);
  };

  return (
    <Box sx={{ height: "inherit", overflowY: "scroll" }}>
      <Container maxWidth="xl" sx={{ paddingTop: 2, paddingBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Oportunidad: Blablabal
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.slice(0, -1).map((label, index) => (
              <Step
                key={label}
                last
                completed={stepIsCompleted(index)}
                disabled={!stepIsCompleted(index - 1)}
              >
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {stepTypeToSpanish(label)}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {!allStepsCompleted() && (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Anterior
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    disabled={!stepIsCompleted(activeStep)}
                  >
                    Siguiente
                  </Button>
                  {activeStep !== steps.length &&
                    !stepIsCompleted(activeStep) && (
                      <Button onClick={handleComplete}>Completar etapa</Button>
                    )}
                </Box>
              </React.Fragment>
            )}
          </div>
          <Container maxWidth="lg">
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h4" align="center" gutterBottom>
                  {stepTypeToSpanish(steps[activeStep])}
                </Typography>
              </Grid>
              <Grid item>{renderStage(steps[activeStep])}</Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

Opportunity.getInitialProps = async (ctx): Promise<OpportunityProps> => {
  return { id: ctx.query.id as string };
};

export default Opportunity;
