import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, FormikRating, FormikTextField } from "../common/formik-fields";
import { POCImplementationInfo } from "../model/opportunity";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
  uxRating: yup
    .number()
    .min(1, "Se requiere un rating de UX")
    .required("Se requiere un rating de UX")
    .max(5),
  processRating: yup
    .number()
    .min(1, "Se requiere un rating de procesos")
    .required("Se requiere un rating de procesos")
    .max(5),
});

export default function OpportunityPOCImplementation() {
  const formik = useFormik({
    initialValues: {
      notes: "",
      uxRating: "",
      processRating: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Form<POCImplementationInfo>) => {
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
          <Grid container direction="column" rowSpacing={2}>
            <Grid
              item
              container
              direction="row"
              justifyContent="space-evenly"
              columnSpacing={2}
              columns={2}
            >
              <Grid xs={1} item>
                <FormikRating
                  name="uxRating"
                  label="Rating de UX"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Grid>
              <Grid xs={1} item>
                <FormikRating
                  name="processRating"
                  label="Rating de Proceso"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Grid>
            </Grid>
            <Grid item>
              <FormikTextField
                name="notes"
                label="Notas"
                multiline
                rows={6}
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
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
