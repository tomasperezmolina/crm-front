import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, FormikTextField } from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";
import {
  CanceledOpportunity,
  FirstMeetingInfo,
  OpportunityInFirstMeeting,
} from "../model/opportunity";
import { useAppDispatch } from "../state/dispatch";
import { saveOpportunityFirstMeetingInfo } from "../state/opportunities";
import { openSnackbar } from "../state/snackbar";
import {
  dateToARGFormat,
  dateToInputFormat,
  dateToISOStringArgentina,
} from "../common/parse-date";
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
    .min(new Date(), "La fecha de próxima reunión debe ser en el futuro")
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
    .min(new Date(), "La fecha de proyecto debe ser en el futuro")
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
    ...form,
    employeeAmount: parseInt(form.employeeAmount),
    nextMeetingDate: dateToISOStringArgentina(form.nextMeetingDate),
    projectDate: dateToISOStringArgentina(form.projectDate),
  };
}

function infoToForm(info: FirstMeetingInfo): Form<FirstMeetingInfo> {
  return {
    ...info,
    employeeAmount: `${info.employeeAmount}`,
    nextMeetingDate: dateToInputFormat(info.nextMeetingDate),
    projectDate: dateToInputFormat(info.projectDate),
  };
}

interface OpportunityFirstMeetingProps {
  opportunity: (OpportunityInFirstMeeting | CanceledOpportunity) & Identifiable;
}

export default function OpportunityFirstMeeting({
  opportunity,
}: OpportunityFirstMeetingProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
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
        setEditing(false);
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
    },
  });

  const handleEdit = () => {
    formik.setValues(infoToForm(opportunity.firstMeetingInfo!));
    setEditing(true);
  };

  return (
    <>
      {opportunity.firstMeetingInfo && !editing ? (
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
              content: dateToARGFormat(
                opportunity.firstMeetingInfo.nextMeetingDate
              ),
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
              content: dateToARGFormat(
                opportunity.firstMeetingInfo.projectDate
              ),
            },
            {
              title: "Duración del proyecto",
              content: opportunity.firstMeetingInfo.projectDuration,
            },
          ]}
          onEdit={opportunity.step !== "Canceled" && handleEdit}
        />
      ) : (
        <>
          {opportunity.step !== "Canceled" && (
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
                    <Grid
                      item
                      xs={1}
                      container
                      direction="column"
                      rowSpacing={2}
                    >
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
                    <Grid
                      item
                      xs={1}
                      container
                      direction="column"
                      rowSpacing={2}
                    >
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
      )}
    </>
  );
}
