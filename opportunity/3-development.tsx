import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import FormikTextField from "../common/formik-text-field";
import formikInitialValues from "../common/formik-initial-values";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  licenseAmount: yup
    .number()
    .positive("Se require un número positivo")
    .required("Se requiere un número de licencias"),
  packAmount: yup
    .number()
    .positive("Se require un número positivo")
    .required("Se requiere un número de paquetes de oficina"),
  packs: yup.string().required("Se requiere una lista de paquetes"),
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
    initialValues: formikInitialValues(validationSchema.fields),
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
                name="licenseAmount"
                label="Cantidad de licencias"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="packAmount"
                label="Cantidad de paquetes"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="packs"
                label="Paquetes"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
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
