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
} from "@mui/material";
import { steps } from "../../../model/opportunity";
import { stepTypeToSpanish } from "../../../spanish/opportunity";
import { Stepped } from "../../../model/company";

interface OpportunityProps {
  id?: string;
}

const mockOpportunity: Stepped = {
  step: "Prospect",
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

  const handleReset = () => {
    setActiveStep(0);
    setOpportunity({step: 'Prospect'});
  };

  const handleComplete = () => {
    setOpportunity({step: steps[steps.indexOf(opportunity.step) + 1]})
    handleNext();
  };

  const stepIsCompleted = (stepIndex: number) => {
    return stepIndex < steps.indexOf(opportunity.step);
  }

  return (
    <Container maxWidth="xl" sx={{paddingTop: 2}}>
      <Typography variant="h4" align="center" gutterBottom>
        Oportunidad: Blablabal
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.slice(0, -1).map((label, index) => (
            <Step key={label} last completed={stepIsCompleted(index)} disabled={!stepIsCompleted(index-1)}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {stepTypeToSpanish(label)}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }} disabled={!stepIsCompleted(activeStep)}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (stepIsCompleted(activeStep) ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </Container>
  );
};

Opportunity.getInitialProps = async (ctx): Promise<OpportunityProps> => {
  return { id: ctx.query.id as string };
};

export default Opportunity;
