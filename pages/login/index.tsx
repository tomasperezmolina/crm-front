import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikTextField } from "../../common/formik-fields";
import { formikInitialValues } from "../../common/formik-props";
import { getCsrfToken, signIn } from "next-auth/react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Por favor ingresá un email válido")
    .required("Se requiere un email"),
  password: yup
    .string()
    // .min(8, "La contraseña debe ser de 8 caracteres o más")
    .required("Se requiere una contraseña"),
});

interface LoginProps {
  callbackUrl?: string;
}

const Login: NextPage<LoginProps> = ({ callbackUrl }) => {
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      signIn("credentials", { email: values.email, password: values.password, callbackUrl});
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
                  type="password"
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      callbackUrl: context.query?.callbackUrl || null,
    },
  };
};

// @ts-ignore
Login.public = true;

export default Login;
