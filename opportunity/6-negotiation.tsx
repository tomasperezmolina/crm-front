import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import FormikTextField from "../common/formik-text-field";
import formikInitialValues from "../common/formik-initial-values";

const validationSchema = yup.object({
  address: yup.string().required("Se requiere una dirección"),
  cuit: yup.string().required("Se require un CUIT"),
  socialReason: yup.string().required("Se require una razón social"),
  licenseCode: yup.string().required("Se require un código de licencia"),
  licenseAmount: yup.number().required("Se require una cantidad de licencias"),
  licenseDescription: yup.string().required("Se require un tipo de licencia"),
  paymentMethod: yup.string().required("Se require un método de pago"),
  paymentTerms: yup.string().required("Se require términos de pago"),
  price: yup.number().required("Se require un precio"),
});

export default function OpportunityPOCDevelopment() {
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
                name="licenseCode"
                label="Código de licencia"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Grid>
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
                name="licenseDescription"
                label="Tipo de licencia"
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
              <FormikTextField
                name="price"
                label="Precio"
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
