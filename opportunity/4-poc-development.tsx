import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikLicenseBuilder, FormikTextField } from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  packs: yup
    .array()
    .min(1, "Se requiere por lo menos una licencia")
    .required("Se requiere una lista de licencias a probar"),
  startDate: yup.date().required("Se requiere una fecha de inicio de la POC"),
  endDate: yup
    .date()
    .required("Se requiere una fecha de finalización de la POC"),
  location: yup.string().required("Se requiere ubicación para la POC"),
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
});

export default function OpportunityPOCDevelopment() {
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
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
      rowSpacing={2}
    >
      <Grid item>
        <FormikLicenseBuilder
          name="packs"
          label="Licencias a probar"
          formik={formik}
        />
      </Grid>
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" rowSpacing={2}>
            <Grid item container direction="row" columns={2} columnSpacing={2}>
              <Grid item xs={1}>
                <FormikTextField
                  name="startDate"
                  label="Fecha de inicio"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Grid>
              <Grid item xs={1}>
                <FormikTextField
                  name="endDate"
                  label="Fecha de finalización"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Grid>
            </Grid>
            <Grid item>
              <FormikTextField
                name="location"
                label="Ubicación"
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
