import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import formikProps from "../../../common/formikProps";
import { Company } from "../../../model/company";
import {
  companyTypeToSpanish,
  industryToSpanish,
  regionToSpanish,
} from "../../../spanish/company";
import { useRouter } from "next/router";
import "yup-phone";

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

interface NewOpportunityContactProps {
  id?: string;
}

const mockCompany: Company = {
  id: 5,
  name: "MOCK S.A.",
  companyType: "Type 1",
  region: "North America",
  industry: "Industry 1",
  webpage: "https://formik.org/docs/api/field",
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero. Maecenas efficitur, nulla sit amet convallis semper, ligula nulla tempus enim, eu vulputate nibh erat sed dolor. Pellentesque nulla orci, fermentum ut velit posuere, varius bibendum sem. Mauris euismod tristique nulla a vestibulum. Suspendisse eu lacinia sapien. Fusce mattis arcu lectus. Integer placerat, velit eu commodo finibus, lorem enim molestie nibh, vitae feugiat leo sapien tempus mauris. Aliquam pharetra sed nisl eu laoreet. Mauris nisi nisl, ultrices sit amet neque vitae, mattis sagittis lectus. Mauris nec turpis commodo, finibus metus nec, iaculis turpis. ",
};

const NewOpportunityContact: NextPage<NewOpportunityContactProps> = ({
  id,
}) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      linkedin: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      router.push(`/opportunity/${id}`);
    },
  });

  return (
    <Container maxWidth="lg" sx={{ height: "inherit", display: "flex" }}>
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
                        {...formikProps("surname", "Apellido", formik)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <TextField
                        fullWidth
                        {...formikProps("linkedin", "LinkedIn", formik)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box style={{ minHeight: "80px" }}>
                      <TextField
                        fullWidth
                        {...formikProps("phone", "Teléfono", formik)}
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
        </Grid>
      </Grid>
    </Container>
  );
};

NewOpportunityContact.getInitialProps = async (
  ctx
): Promise<NewOpportunityContactProps> => {
  return { id: ctx.query.id as string };
};

export default NewOpportunityContact;
