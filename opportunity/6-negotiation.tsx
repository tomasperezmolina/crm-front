import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikLicenseBuilder, FormikTextField } from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";

const validationSchema = yup.object({
  address: yup.string().required("Se requiere una dirección"),
  cuit: yup.string().required("Se require un CUIT"),
  socialReason: yup.string().required("Se require una razón social"),
  packs: yup
    .array()
    .min(1, "Se requiere por lo menos una licencia")
    .required("Se requiere una lista de licencias a probar"),
  paymentMethod: yup.string().required("Se require un método de pago"),
  paymentTerms: yup.string().required("Se require términos de pago"),
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
        <FormikLicenseBuilder name="packs" label="Licencias" formik={formik} />
      </Grid>
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" rowSpacing={2}>
            <Grid item>
              <FormikTextField
                name="address"
                label="Dirección"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="cuit"
                label="CUIT"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="socialReason"
                label="Razón Social"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="paymentMethod"
                label="Medio de pago"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
            <Grid item>
              <FormikTextField
                name="paymentTerms"
                label="Términos de pago"
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
