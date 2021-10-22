import React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Company } from "../model/company";
import {
  companyTypeToSpanish,
  industryToSpanish,
  regionToSpanish,
} from "../spanish/company";
import "yup-phone";
import {FormikTextField} from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";

const validationSchema = yup.object({
  name: yup.string().required("Se require un nombre"),
  surname: yup.string().required("Se require un apellido"),
  email: yup
    .string()
    .email("Por favor ingresá un email válido")
    .required("Se requiere un email"),
  linkedin: yup
    .string()
    .url("Por favor ingrese un link válido")
    .matches(/linkedin.com/, "Por favor ingrese un link a LinkedIn")
    .required("Se requiere un link al perfil de LinkedIn del contacto"),
  phone: yup
    .string()
    .phone("AR", false, "Por favor ingrese un número de teléfono válido")
    .required("Se requiere un teléfono para el contacto"),
});

const mockCompany: Company = {
  id: 5,
  name: "MOCK S.A.",
  companyType: "Private",
  region: "North America",
  industry: "Manufacture",
  webpage: "https://formik.org/docs/api/field",
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero. Maecenas efficitur, nulla sit amet convallis semper, ligula nulla tempus enim, eu vulputate nibh erat sed dolor. Pellentesque nulla orci, fermentum ut velit posuere, varius bibendum sem. Mauris euismod tristique nulla a vestibulum. Suspendisse eu lacinia sapien. Fusce mattis arcu lectus. Integer placerat, velit eu commodo finibus, lorem enim molestie nibh, vitae feugiat leo sapien tempus mauris. Aliquam pharetra sed nisl eu laoreet. Mauris nisi nisl, ultrices sit amet neque vitae, mattis sagittis lectus. Mauris nec turpis commodo, finibus metus nec, iaculis turpis. ",
};

export default function OpportunityProspect() {
  const formik = useFormik({
    initialValues: formikInitialValues(validationSchema.fields, validationSchema),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Grid container direction="row" columnSpacing={6} alignContent="center">
      <Grid item xs={6} container direction="column">
        <Typography variant="h3" gutterBottom>
          {mockCompany.name}
        </Typography>
        <Divider />
        <Typography variant="overline">Tipo de compañía</Typography>
        <Typography variant="body1" gutterBottom>
          {companyTypeToSpanish(mockCompany.companyType)}
        </Typography>
        <Divider />
        <Typography variant="overline">Industria</Typography>
        <Typography variant="body1" gutterBottom>
          {industryToSpanish(mockCompany.industry)}
        </Typography>
        <Divider />
        <Typography variant="overline">Región</Typography>
        <Typography variant="body1" gutterBottom>
          {regionToSpanish(mockCompany.region)}
        </Typography>
        <Divider />
        <Typography variant="overline">Notas</Typography>
        <Typography variant="body1" gutterBottom>
          {mockCompany.notes}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ height: "inherit" }}
        >
          <Grid item>
            <Typography variant="h4" align="center" gutterBottom>
              Agregar nuevo contacto
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <FormikTextField
                    name="email"
                    label="Email"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="name"
                    label="Nombre"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="surname"
                    label="Apellido"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="linkedin"
                    label="LinkedIn"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="phone"
                    label="Teléfono"
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
      </Grid>
    </Grid>
  );
}
