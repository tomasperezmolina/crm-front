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
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import formikProps from "../../common/formikProps";
import { companyTypes, industries, regions } from "../../model/company";
import {
  companyTypeToSpanish,
  industryToSpanish,
  regionToSpanish,
} from "../../spanish/company";
import { useRouter } from "next/router";

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
    initialValues: {
      email: "",
      name: "",
      webpage: "",
      companyType: "",
      industry: "",
      region: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      router.push('10/add-contact');
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
                    <Box style={{ minHeight: "80px" }}>
                      <TextField
                        fullWidth
                        {...formikProps("email", "Email", formik)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <TextField
                        fullWidth
                        {...formikProps("name", "Nombre", formik)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <TextField
                        fullWidth
                        {...formikProps("webpage", "Página web", formik)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="region-label">Región</InputLabel>
                        <Select
                          labelId="region-label"
                          {...formikProps("region", "Región", formik)}
                        >
                          {regions.map((t, idx) => (
                            <MenuItem key={idx} value={t}>
                              {regionToSpanish(t)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
                <Grid xs={6} item container direction="column" rowSpacing={2}>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="company-type-label">
                          Tipo de compañía
                        </InputLabel>
                        <Select
                          labelId="company-type-label"
                          {...formikProps(
                            "companyType",
                            "Tipo de compañia",
                            formik
                          )}
                        >
                          {companyTypes.map((t, idx) => (
                            <MenuItem key={idx} value={t}>
                              {companyTypeToSpanish(t)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="industry-label">Industria</InputLabel>
                        <Select
                          labelId="industry-label"
                          {...formikProps("industry", "Industria", formik)}
                        >
                          {industries.map((t, idx) => (
                            <MenuItem key={idx} value={t}>
                              {industryToSpanish(t)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "180px" }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        {...formikProps("notes", "Notas", formik)}
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
