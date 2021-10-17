import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {FormikTextField}  from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
});

export default function OpportunityPOCImplementation() {
  const formik = useFormik({
    initialValues: formikInitialValues(validationSchema.fields, validationSchema),
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
          <Grid container direction="column" rowSpacing={2}>
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
