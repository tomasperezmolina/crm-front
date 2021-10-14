import React from "react";
import {
  Button,
  Grid,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import FormikTextField from "../common/formik-text-field";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  budgetStatus: yup.string().required("Se requiere un estado del presupuesto"),
  employeeAmount: yup
    .number()
    .min(1, "La cantidad de empleados debe ser positiva")
    .required("Se requiere una cantidad de empleados aproximada"),
  locations: yup.string().required("Se require una lista de ubicaciones"),
  nextMeeting: yup
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
    .number()
    .required("Se requiere una duración aproximada del proyecto en días"),
  projectOwner: yup.string().required("Se require el nombre del project owner"),
});

export default function OpportunityFirstMeeting() {
  const formik = useFormik({
    initialValues: {
      budgetStatus: "",
      employeeAmount: "",
      locations: "",
      nextMeeting: "",
      notes: "",
      othersInvolved: "",
      problem: "",
      projectDate: "",
      projectDuration: "",
      projectOwner: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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
                  name="nextMeeting"
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
                  label="Duración del proyecto (días)"
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
  );
}
