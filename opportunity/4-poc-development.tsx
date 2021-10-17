import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {FormikTextField}  from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  packets: yup.string().required("Se requiere una lista de paquetes a probar"),
  duration: yup
    .number()
    .min(1)
    .required("Se requiere un número de días para la duración de la POC"),
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
                name="packets"
                label="Paquetes"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="duration"
                label="Duración (días)"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="startDate"
                label="Fecha de inicio"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="endDate"
                label="Fecha de finalización"
                formik={formik}
                validationSchema={validationSchema}
              />
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
