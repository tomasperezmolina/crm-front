import type { NextPage } from "next";
import React, { useState } from "react";
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
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  CanceledOpportunity,
  CancelOpportunityForm,
  CancelOpportunityInfo,
  inferCanceledOpportunityStep,
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
  advanceOpportunityStage,
  cancelOpportunity,
  selectOpportunity,
} from "../../../state/opportunities";
import ErrorPage from "next/error";
import { openSnackbar } from "../../../state/snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/router";

interface OpportunityProps {}

const renderStage = (
  opportunity: OpportunityInfo & Identifiable,
  stage: StepType
) => {
  switch (stage) {
    case "Prospect":
      return (
        <OpportunityProspect
          opportunity={opportunity as OpportunityInProspect & Identifiable}
        />
      );
    case "First meeting":
      return (
        <OpportunityFirstMeeting
          opportunity={opportunity as OpportunityInFirstMeeting & Identifiable}
        />
      );
    case "Development":
      return (
        <OpportunityDevelopment
          opportunity={opportunity as OpportunityInDevelopment & Identifiable}
        />
      );
    case "POC development":
      return (
        <OpportunityPOCDevelopment
          opportunity={
            opportunity as OpportunityInPOCDevelopment & Identifiable
          }
        />
      );
    case "POC implementation":
      return (
        <OpportunityPOCImplementation
          opportunity={
            opportunity as OpportunityInPOCImplementation & Identifiable
          }
        />
      );
    case "Negotiation":
      return (
        <OpportunityNegotiation
          opportunity={opportunity as OpportunityInNegotiation & Identifiable}
        />
      );
  }
};

interface CancelExplanationDialogProps {
  id: number;
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  reason: yup.string().required("Se require una razón de finalización"),
});

const FinalizationExplanationDialog = ({
  id,
  open,
  onClose,
}: CancelExplanationDialogProps) => {
  const dispatch = useAppDispatch();
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
    onSubmit: async (values: CancelOpportunityForm) => {
      try {
        await dispatch(
          cancelOpportunity({
            id,
            info: values,
          })
        );
        handleClose();
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
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

function getActiveOpportunityStep(opportunity: OpportunityInfo): StepType {
  if (opportunity.step === "Canceled")
    return inferCanceledOpportunityStep(opportunity as CanceledOpportunity);
  if (opportunity.step === "Completed") return "Prospect";
  return opportunity.step;
}

function LoadedOpportunity({ opportunity }: LoadedOpportunityProps) {
  const [activeStep, setActiveStep] = useState(
    steps.indexOf(getActiveOpportunityStep(opportunity))
  );
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
      await dispatch(advanceOpportunityStage(opportunity.id));
      handleNext();
    } catch (e: any) {
      dispatch(openSnackbar({ msg: e.message, type: "error" }));
    }
  };

  const stepIsCompleted = (stepIndex: number) => {
    return stepIndex < steps.indexOf(opportunity.step);
  };

  const stepIsCanceled = (stepIndex: number) => {
    if (opportunity.step !== "Canceled") return false;
    const canceledStep = inferCanceledOpportunityStep(
      opportunity as CanceledOpportunity
    );
    return steps.indexOf(canceledStep) <= stepIndex;
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
              {steps.slice(0, -2).map((label, index) => (
                <Step
                  key={label}
                  last
                  completed={stepIsCompleted(index) && !stepIsCanceled(index)}
                  disabled={
                    !stepIsCompleted(index - 1) || stepIsCanceled(index - 1)
                  }
                >
                  <StepButton
                    onClick={handleStep(index)}
                    color="inherit"
                    icon={
                      stepIsCanceled(index) && (
                        <CancelIcon
                          color={
                            stepIsCanceled(index - 1) ? "disabled" : "error"
                          }
                          fontSize="medium"
                        />
                      )
                    }
                  >
                    {stepTypeToSpanish(label)}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              <>
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
                    <Grid container direction="column" sx={{ width: "unset" }}>
                      <Button onClick={handleComplete}>Completar etapa</Button>
                      <Button onClick={handleOpenDialog} color="error">
                        Finalizar oportunidad
                      </Button>
                    </Grid>
                  ) : (
                    <Button
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      disabled={
                        activeStep === steps.length - 3 ||
                        stepIsCanceled(activeStep) ||
                        !stepIsCompleted(activeStep)
                      }
                    >
                      Siguiente
                    </Button>
                  )}
                </Box>
              </>
            </div>
            <Container maxWidth="lg">
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <Typography variant="h4" align="center">
                    {stepTypeToSpanish(steps[activeStep])}
                  </Typography>
                </Grid>
                {stepIsCanceled(activeStep) && (
                  <Grid item>
                    <Alert severity="error">
                      <AlertTitle>Oportunidad cancelada</AlertTitle>
                      {
                        (opportunity as CanceledOpportunity).cancellationInfo
                          .reason
                      }
                    </Alert>
                  </Grid>
                )}
                <Grid item>{renderStage(opportunity, steps[activeStep])}</Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
      </Box>
      <FinalizationExplanationDialog
        id={opportunity.id}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}

const Opportunity: NextPage<OpportunityProps> = () => {
  const router = useRouter();
  const { id: rawId } = router.query;
  const parsedId = parseInt(rawId as string)
  const id = isNaN(parsedId) ? -1 : parsedId;
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

export default Opportunity;
