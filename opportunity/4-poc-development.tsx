import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Form,
  FormikLicenseBuilder,
  FormikTextField,
} from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";
import {
  OpportunityInPOCDevelopment,
  POCDevelopmentInfo,
} from "../model/opportunity";
import { useAppDispatch } from "../state/dispatch";
import { openSnackbar } from "../state/snackbar";
import { saveOpportunityPOCDevelopmentInfo } from "../state/opportunities";
import { Identifiable } from "../model/base";
import { InfoTable } from "../common/info-table";
import { LicenseTable } from "../common/license-builder";
import { nanoid } from "nanoid";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  packs: yup
    .array()
    .min(1, "Se requiere por lo menos una licencia")
    .required("Se requiere una lista de licencias a probar"),
  startDate: yup.date().required("Se requiere una fecha de inicio de la POC"),
  endDate: yup
    .date()
    .required("Se requiere una fecha de finalización de la POC"),
  location: yup.string().required("Se requiere ubicación para la POC"),
  successCriteria: yup
    .string()
    .required("Se requiere una serie de criterios de éxito"),
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
});

interface OpportunityPOCDevelopmentProps {
  opportunity: OpportunityInPOCDevelopment & Identifiable;
}

export default function OpportunityPOCDevelopment({
  opportunity,
}: OpportunityPOCDevelopmentProps) {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: async (values: POCDevelopmentInfo) => {
      try {
        await dispatch(
          saveOpportunityPOCDevelopmentInfo({
            id: opportunity.id,
            info: values,
          })
        );
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
    },
  });

  return (
    <>
      {opportunity.pocDevelopmentInfo ? (
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <InfoTable
              title="Datos de desarrollo de POC"
              titleVariant="h5"
              rows={[
                {
                  title: "Fecha de inicio",
                  content: new Date(opportunity.pocDevelopmentInfo.startDate).toLocaleDateString(),
                },
                {
                  title: "Fecha de finalización",
                  content: new Date(opportunity.pocDevelopmentInfo.endDate).toLocaleDateString(),
                },
                {
                  title: "Ubicación",
                  content: opportunity.pocDevelopmentInfo.location,
                },
                {
                  title: "Criterios de éxito",
                  content: opportunity.pocDevelopmentInfo.successCriteria,
                },
                {
                  title: "Notas",
                  content: opportunity.pocDevelopmentInfo.notes,
                },
              ]}
            />
          </Grid>
          <Grid item>
            <LicenseTable
              title="Licencias a probar"
              rows={opportunity.pocDevelopmentInfo.packs.map((r) => ({
                id: nanoid(),
                totalPrice: r.pricePerUnit * r.amount,
                ...r,
              }))}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ height: "inherit" }}
          rowSpacing={2}
        >
          <Grid item>
            <FormikLicenseBuilder
              name="packs"
              label="Licencias a probar"
              formik={formik}
            />
          </Grid>
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" rowSpacing={2}>
                <Grid
                  item
                  container
                  direction="row"
                  columns={2}
                  columnSpacing={2}
                >
                  <Grid item xs={1}>
                    <FormikTextField
                      name="startDate"
                      label="Fecha de inicio"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <FormikTextField
                      name="endDate"
                      label="Fecha de finalización"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="location"
                    label="Ubicación"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="successCriteria"
                    label="Criterios de éxito"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="notes"
                    label="Notas"
                    multiline
                    rows={6}
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
  );
}
