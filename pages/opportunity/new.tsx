import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { companyTypes, industries, regions } from "../../model/company";
import {
  companyTypeToSpanish,
  industryToSpanish,
  regionToSpanish,
} from "../../spanish/company";
import { useRouter } from "next/router";
import { FormikSelectField, FormikTextField } from "../../common/formik-fields";
import {formikInitialValues} from "../../common/formik-props";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  name: yup.string().required("Se require un nombre"),
  email: yup
    .string()
    .email("Por favor ingresá un email válido")
    .required("Se requiere un email"),
  webpage: yup
    .string()
    .url("Se requiere un link válido")
    .required("Se require un link a la página del cliente"),
  companyType: yup
    .string()
    .oneOf(companyTypes.slice(), "Tipo de compañía inválido")
    .required("Se requiere un tipo de compañía"),
  industry: yup
    .string()
    .oneOf(industries.slice(), "Industria inválida")
    .required("Se requiere una industria"),
  region: yup
    .string()
    .oneOf(regions.slice(), "Región inválida")
    .required("Se requiere una región"),
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
});

interface NewOpportunityProps {}

const NewOpportunity: NextPage<NewOpportunityProps> = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: formikInitialValues(validationSchema.fields, validationSchema),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      router.push("/opportunity/0");
    },
  });

  return (
    <>
      <Container maxWidth="md" sx={{ height: "inherit" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ height: "inherit" }}
        >
          <Grid item>
            <Typography variant="h3" align="center" gutterBottom>
              Nuevo prospecto
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="row" columnSpacing={2}>
                <Grid xs={6} item container direction="column" rowSpacing={2}>
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
                      name="webpage"
                      label="Página web"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item>
                    <FormikSelectField
                      name="region"
                      label="Región"
                      formik={formik}
                      validationSchema={validationSchema}
                    >
                      {regions.map((t, idx) => (
                        <MenuItem key={idx} value={t}>
                          {regionToSpanish(t)}
                        </MenuItem>
                      ))}
                    </FormikSelectField>
                  </Grid>
                </Grid>
                <Grid xs={6} item container direction="column" rowSpacing={2}>
                  <Grid item>
                    <FormikSelectField
                      name="companyType"
                      label="Tipo de compañia"
                      formik={formik}
                      validationSchema={validationSchema}
                    >
                      {companyTypes.map((t, idx) => (
                        <MenuItem key={idx} value={t}>
                          {companyTypeToSpanish(t)}
                        </MenuItem>
                      ))}
                    </FormikSelectField>
                  </Grid>
                  <Grid item>
                    <FormikSelectField
                      name="industry"
                      label="Industria"
                      formik={formik}
                      validationSchema={validationSchema}
                    >
                      {industries.map((t, idx) => (
                        <MenuItem key={idx} value={t}>
                          {industryToSpanish(t)}
                        </MenuItem>
                      ))}
                    </FormikSelectField>
                  </Grid>
                  <Grid item>
                    <FormikTextField
                      name="notes"
                      label="Notas"
                      multiline
                      rows={5}
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
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
      <style global jsx>{`
        #notes {
          height: 120px !important;
        }
      `}</style>
    </>
  );
};

export default NewOpportunity;
