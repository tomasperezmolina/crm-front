import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  companyTypeToSpanish,
  industryToSpanish,
  regionToSpanish,
} from "../spanish/company";
import "yup-phone";
import { Form, FormikTextField } from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";
import {
  CanceledOpportunity,
  Contact,
  OpportunityInfo,
  OpportunityInProspect,
} from "../model/opportunity";
import { Identifiable } from "../model/base";
import { InfoTable } from "../common/info-table";
import { useAppDispatch } from "../state/dispatch";
import { saveOpportunityContact } from "../state/opportunities";
import { openSnackbar } from "../state/snackbar";

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

const mockCompany: OpportunityInfo & Identifiable = {
  id: 5,
  name: "MOCK S.A.",
  companyType: "Private",
  region: "North America",
  industry: "Manufacture",
  webpage: "https://formik.org/docs/api/field",
  step: "Prospect",
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ante eget dolor luctus mollis quis ac libero. Maecenas efficitur, nulla sit amet convallis semper, ligula nulla tempus enim, eu vulputate nibh erat sed dolor. Pellentesque nulla orci, fermentum ut velit posuere, varius bibendum sem. Mauris euismod tristique nulla a vestibulum. Suspendisse eu lacinia sapien. Fusce mattis arcu lectus. Integer placerat, velit eu commodo finibus, lorem enim molestie nibh, vitae feugiat leo sapien tempus mauris. Aliquam pharetra sed nisl eu laoreet. Mauris nisi nisl, ultrices sit amet neque vitae, mattis sagittis lectus. Mauris nec turpis commodo, finibus metus nec, iaculis turpis. ",
};

interface CompanyInfoProps {
  company: OpportunityInfo & Identifiable;
}

function CompanyInfo({ company }: CompanyInfoProps) {
  return (
    <InfoTable
      title={company.name}
      titleVariant="h3"
      rows={[
        {
          title: "Tipo de compañía",
          content: companyTypeToSpanish(company.companyType)!,
        },
        {
          title: "Industria",
          content: industryToSpanish(company.industry)!,
        },
        {
          title: "Región",
          content: regionToSpanish(company.region)!,
        },
        {
          title: "Notas",
          content: company.notes,
        },
      ]}
    />
  );
}

interface OpportunityProspectProps {
  opportunity: (OpportunityInProspect | CanceledOpportunity) & Identifiable;
}

export default function OpportunityProspect({
  opportunity,
}: OpportunityProspectProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: async (values: Contact) => {
      try {
        await dispatch(
          saveOpportunityContact({ id: opportunity.id, contact: values })
        );
        setEditing(false);
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
    },
  });

  const handleEdit = () => {
    formik.setValues(opportunity.contact!);
    setEditing(true);
  };

  return (
    <Grid container direction="row" columnSpacing={6} alignContent="center">
      <Grid item xs={6} container direction="column">
        <CompanyInfo company={opportunity} />
      </Grid>
      <Grid item xs={6}>
        {opportunity.contact && !editing ? (
          <InfoTable
            title="Contacto"
            titleVariant="h5"
            rows={[
              {
                title: "Email",
                content: opportunity.contact.email,
              },
              {
                title: "Nombre",
                content: opportunity.contact.name,
              },
              {
                title: "Apellido",
                content: opportunity.contact.surname,
              },
              {
                title: "LinkedIn",
                content: opportunity.contact.linkedin,
              },
              {
                title: "Teléfono",
                content: opportunity.contact.phone,
              },
            ]}
            onEdit={opportunity.step !== "Canceled" && handleEdit}
          />
        ) : (
          <>
            {opportunity.step !== "Canceled" && (
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
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}
