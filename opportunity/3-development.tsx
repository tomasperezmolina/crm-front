import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikLicenseBuilder, FormikTextField } from "../common/formik-fields";
import LicenseBuilder, { LicenseRow } from "../common/license-builder";
import { formikInitialValues } from "../common/formik-props";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  packs: yup
    .array()
    .min(1, "Se requiere por lo menos una licencia")
    .required("Se requiere una lista de licencias"),
  principalArea: yup
    .string()
    .required("Se requiere una área principal involucrada"),
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
});

export default function OpportunityDevelopment() {
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
      rowSpacing={2}
      justifyContent="center"
      sx={{ height: "inherit" }}
    >
      <Grid item>
        <FormikLicenseBuilder
          name='packs'
          label='Licencias'
          formik={formik}
        />
      </Grid>
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>
              <FormikTextField
                name="principalArea"
                label="Área principal"
                formik={formik}
                validationSchema={validationSchema}
              />
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
