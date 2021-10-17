import type { NextPage } from "next";
import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {FormikTextField}  from "../../common/formik-fields";
import {formikInitialValues} from "../../common/formik-props";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Por favor ingresá un email válido")
    .required("Se requiere un email"),
  password: yup
    .string()
    .min(8, "La contraseña debe ser de 8 caracteres o más")
    .required("Se requiere una contraseña"),
});

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const formik = useFormik({
    initialValues: formikInitialValues(validationSchema.fields, validationSchema),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth="sm" sx={{ height: "inherit" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ height: "inherit" }}
      >
        <Grid item>
          <Typography variant="h1" align="center" gutterBottom>
            /CRM/
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
                  name="password"
                  type='password'
                  label="Contraseña"
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
    </Container>
  );
};

export default Login;
