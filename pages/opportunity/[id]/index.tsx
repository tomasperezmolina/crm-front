import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  CancelOpportunityInfo,
  OpportunityInDevelopment,
  OpportunityInFirstMeeting,
  OpportunityInfo,
  OpportunityInNegotiation,
  OpportunityInPOCDevelopment,
  OpportunityInPOCImplementation,
  OpportunityInProspect,
  steps,
  StepType,
} from "../../../model/opportunity";
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
import { Identifiable } from "../../../model/base";
import { useAppDispatch, useAppSelector } from "../../../state/dispatch";
import {
  completeOpportunity,
  selectOpportunity,
  sendOpportunityToDevelopment,
  sendOpportunityToFirstMeeting,
  sendOpportunityToNegotiation,
  sendOpportunityToPOCDevelopment,
  sendOpportunityToPOCImplementation,
} from "../../../state/opportunities";
import * as RemoteData from "../../../model/remote-data";
import ErrorPage from "next/error";
import { openSnackbar } from "../../../state/snackbar";

interface OpportunityProps {
  id: number;
}

const renderStage = (
  opportunity: OpportunityInfo & Identifiable,
  stage: StepType
) => {
  switch (stage) {
    case "Prospect":
      return <OpportunityProspect opportunity={opportunity as OpportunityInProspect & Identifiable} />;
    case "First meeting":
      return <OpportunityFirstMeeting opportunity={opportunity as OpportunityInFirstMeeting & Identifiable} />;
    case "Development":
      return <OpportunityDevelopment opportunity={opportunity as OpportunityInDevelopment & Identifiable} />;
    case "POC development":
      return <OpportunityPOCDevelopment opportunity={opportunity as OpportunityInPOCDevelopment & Identifiable} />;
    case "POC implementation":
      return <OpportunityPOCImplementation opportunity={opportunity as OpportunityInPOCImplementation & Identifiable} />;
    case "Negotiation":
      return <OpportunityNegotiation opportunity={opportunity as OpportunityInNegotiation & Identifiable} />;
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
  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: (values: CancelOpportunityInfo) => {
      alert(JSON.stringify(values, null, 2));
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
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
          <Button type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

interface LoadedOpportunityProps {
  opportunity: OpportunityInfo & Identifiable;
}

function LoadedOpportunity({ opportunity }: LoadedOpportunityProps) {
  const [activeStep, setActiveStep] = useState(steps.indexOf(opportunity.step));
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

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

  const handleComplete = async () => {
    try {
      switch (steps[activeStep]) {
        case "Prospect":
          await dispatch(sendOpportunityToFirstMeeting(opportunity.id));
          break;
        case "First meeting":
          await dispatch(sendOpportunityToDevelopment(opportunity.id));
          break;
        case "Development":
          await dispatch(sendOpportunityToPOCDevelopment(opportunity.id));
          break;
        case "POC development":
          await dispatch(sendOpportunityToPOCImplementation(opportunity.id));
          break;
        case "POC implementation":
          await dispatch(sendOpportunityToNegotiation(opportunity.id));
          break;
        case "Negotiation":
          await dispatch(completeOpportunity(opportunity.id));
          break;
      }
      handleNext();
    } catch (e: any) {
      dispatch(openSnackbar({ msg: e.message, type: "error" }));
    }
  };

  const stepIsCompleted = (stepIndex: number) => {
    return stepIndex < steps.indexOf(opportunity.step);
  };

  return (
    <>
      <Box sx={{ height: "inherit", overflowY: "scroll" }}>
        <Container maxWidth="xl" sx={{ paddingTop: 2, paddingBottom: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Oportunidad: {opportunity.name}
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
                <Grid item>{renderStage(opportunity, steps[activeStep])}</Grid>
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
}

const Opportunity: NextPage<OpportunityProps> = ({ id }) => {
  const opportunity = useAppSelector(selectOpportunity(id));

  return (
    <>
      {opportunity.state === "success" && (
        <LoadedOpportunity opportunity={opportunity.value} />
      )}
      {opportunity.state === "error" && <ErrorPage statusCode={404} />}
      {opportunity.state === "loading" && (
        <Grid
          container
          height="100%"
          direction="column"
          justifyContent="center"
          alignContent="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<OpportunityProps> = async (
  context
) => {
  const rawId = context.params?.id as string;
  if (!rawId) {
    return {
      notFound: true,
    };
  }
  const parsed = parseInt(rawId);
  if (isNaN(parsed)) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id: parsed,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Opportunity;
