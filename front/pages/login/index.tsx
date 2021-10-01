import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth="sm" sx={{height: 'inherit'}}>
      <Grid container direction='column' justifyContent='center' sx={{height: 'inherit'}}>
        <Grid item>
          <Typography variant="h1" align="center" gutterBottom>
            /CRM/
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                <Box style={{ minHeight: "80px" }}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box style={{ minHeight: "80px" }}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Box>
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
