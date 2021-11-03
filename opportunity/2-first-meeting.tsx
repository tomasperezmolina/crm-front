import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, FormikTextField } from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";
import { FirstMeetingInfo, OpportunityInFirstMeeting } from "../model/opportunity";
import { useAppDispatch } from "../state/dispatch";
import { saveOpportunityFirstMeetingInfo } from "../state/opportunities";
import { openSnackbar } from "../state/snackbar";
import { dateToISOStringArgentina } from "../common/parse-date";
import { Identifiable } from "../model/base";
import { InfoTable } from "../common/info-table";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  budgetStatus: yup.string().required("Se requiere un estado del presupuesto"),
  employeeAmount: yup
    .number()
    .positive("Se require un número positivo")
    .required("Se requiere una cantidad de empleados aproximada"),
  locations: yup.string().required("Se require una lista de ubicaciones"),
  nextMeetingDate: yup
    .date()
    .required("Se require una fecha para la próxima reunión"),
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
  othersInvolved: yup
    .string()
    .required("Se require una aclaración de otras personas involucradas"),
  problem: yup.string().required("Se require una descripción del problema"),
  projectDate: yup
    .date()
    .required("Se require una fecha aproximada del proyecto"),
  projectDuration: yup
    .string()
    .required(
      "Se requiere una descripción aproximada de la duración del proyecto"
    ),
  projectOwner: yup.string().required("Se require el nombre del project owner"),
});

function formToInfo(form: Form<FirstMeetingInfo>): FirstMeetingInfo {
  return {
    budgetStatus: form.budgetStatus,
    employeeAmount: parseInt(form.employeeAmount),
    locations: form.locations,
    nextMeetingDate: dateToISOStringArgentina(form.nextMeetingDate),
    notes: form.notes,
    othersInvolved: form.othersInvolved,
    problem: form.problem,
    projectDate: dateToISOStringArgentina(form.projectDate),
    projectDuration: form.projectDuration,
    projectOwner: form.projectOwner,
  };
}

interface OpportunityFirstMeetingProps {
  opportunity: OpportunityInFirstMeeting & Identifiable
}

export default function OpportunityFirstMeeting({
  opportunity,
}: OpportunityFirstMeetingProps) {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: async (values: Form<FirstMeetingInfo>) => {
      try {
        await dispatch(
          saveOpportunityFirstMeetingInfo({
            id: opportunity.id,
            info: formToInfo(values),
          })
        );
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
    },
  });

  return (
    <>
      {opportunity.firstMeetingInfo ? (
        <InfoTable
          title="Datos de primera reunión"
          titleVariant="h5"
          rows={[
            {
              title: "Problema",
              content: opportunity.firstMeetingInfo.problem,
            },
            {
              title: "Project Owner",
              content: opportunity.firstMeetingInfo.projectOwner,
            },
            {
              title: "Próxima reunión",
              content: new Date(opportunity.firstMeetingInfo.nextMeetingDate).toLocaleDateString(),
            },
            {
              title: "Estado del presupuesto",
              content: opportunity.firstMeetingInfo.budgetStatus,
            },
            {
              title: "Cantidad de empleados",
              content: `${opportunity.firstMeetingInfo.employeeAmount}`,
            },
            {
              title: "Ubicaciones",
              content: opportunity.firstMeetingInfo.locations,
            },
            {
              title: "Otros involucrados",
              content: opportunity.firstMeetingInfo.othersInvolved,
            },
            {
              title: "Fecha del proyecto",
              content: new Date(opportunity.firstMeetingInfo.projectDate).toLocaleDateString(),
            },
            {
              title: "Duración del proyecto",
              content: opportunity.firstMeetingInfo.projectDuration,
            },
          ]}
        />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ height: "inherit" }}
        >
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                direction="row"
                columns={2}
                columnSpacing={2}
                rowSpacing={2}
              >
                <Grid item xs={2}>
                  <FormikTextField
                    name="problem"
                    label="Problema"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item xs={1} container direction="column" rowSpacing={2}>
                  <Grid item>
                    <FormikTextField
                      name="projectOwner"
                      label="Project Owner"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="budgetStatus"
                      label="Estado del presupuesto"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="employeeAmount"
                      label="Cantidad de empleados"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="locations"
                      label="Ubicaciones"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={1} container direction="column" rowSpacing={2}>
                  <Grid item>
                    <FormikTextField
                      name="nextMeetingDate"
                      label="Próxima reunión"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="othersInvolved"
                      label="Otros involucrados"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="projectDate"
                      label="Fecha del proyecto"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="projectDuration"
                      label="Duración del proyecto"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <FormikTextField
                    name="notes"
                    label="Notas"
                    multiline
                    rows={6}
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
    </>
  );
}
