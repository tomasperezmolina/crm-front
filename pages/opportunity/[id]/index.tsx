import type { NextPage } from "next";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { CancelOpportunityInfo, steps, StepType } from "../../../model/opportunity";
import { stepTypeToSpanish } from "../../../spanish/opportunity";
import {
  OpportunityProspect,
  OpportunityFirstMeeting,
  OpportunityDevelopment,
  OpportunityPOCDevelopment,
  OpportunityPOCImplementation,
  OpportunityNegotiation,
} from "../../../opportunity";
import { FormikTextField } from "../../../common/formik-fields";
import * as yup from "yup";
import { useFormik } from "formik";
import { formikInitialValues } from "../../../common/formik-props";

interface OpportunityProps {
  id?: string;
}

const mockOpportunity: { step: StepType } = {
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

interface CancelExplanationDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  reason: yup.string().required("Se require una razón de finalización"),
});

const FinalizationExplanationDialog = ({
  open,
  onClose,
}: CancelExplanationDialogProps) => {
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: (values: CancelOpportunityInfo) => {
      alert(JSON.stringify(values, null, 2));
      onClose();
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open, formik]);

  return (
    <Dialog open={open}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Finalizar oportunidad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor ingrese una razón para la finalización de la oportunidad
          </DialogContentText>
          <FormikTextField
            autoFocus
            margin="dense"
            name="reason"
            label="Razón de finalización"
            multiline
            rows={2}
            formik={formik}
            validationSchema={validationSchema}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Opportunity: NextPage<OpportunityProps> = ({ id }) => {
  const [activeStep, setActiveStep] = React.useState(
    steps.indexOf(mockOpportunity.step)
  );
  const [opportunity, setOpportunity] = React.useState(mockOpportunity);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

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
    <>
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

                    {activeStep !== steps.length &&
                    !stepIsCompleted(activeStep) ? (
                      <Grid
                        container
                        direction="column"
                        sx={{ width: "unset" }}
                      >
                        <Button onClick={handleComplete}>
                          Completar etapa
                        </Button>
                        <Button onClick={handleOpenDialog} color="error">
                          Finalizar oportunidad
                        </Button>
                      </Grid>
                    ) : (
                      <Button
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                        disabled={!stepIsCompleted(activeStep)}
                      >
                        Siguiente
                      </Button>
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
      <FinalizationExplanationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
};

Opportunity.getInitialProps = async (ctx): Promise<OpportunityProps> => {
  return { id: ctx.query.id as string };
};

export default Opportunity;
