import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikLicenseBuilder, FormikTextField } from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";
import {
  CanceledOpportunity,
  DevelopmentInfo,
  OpportunityInDevelopment,
} from "../model/opportunity";
import { saveOpportunityDevelopmentInfo } from "../state/opportunities";
import { openSnackbar } from "../state/snackbar";
import { useAppDispatch } from "../state/dispatch";
import { Identifiable } from "../model/base";
import { InfoTable } from "../common/info-table";
import { LicenseTable } from "../common/license-builder";
import { nanoid } from "nanoid";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  packs: yup
    .array()
    .min(1, "Se requiere por lo menos una licencia")
    .required("Se requiere una lista de licencias"),
  principalArea: yup
    .string()
    .required("Se requiere una área principal involucrada"),
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
});

interface OpportunityDevelopmentProps {
  opportunity: (OpportunityInDevelopment | CanceledOpportunity) & Identifiable;
}

export default function OpportunityDevelopment({
  opportunity,
}: OpportunityDevelopmentProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: async (values: DevelopmentInfo) => {
      try {
        await dispatch(
          saveOpportunityDevelopmentInfo({
            id: opportunity.id,
            info: values,
          })
        );
        setEditing(false);
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
    },
  });

  const handleEdit = () => {
    formik.setValues(opportunity.developmentInfo!);
    setEditing(true);
  };

  return (
    <>
      {opportunity.developmentInfo && !editing ? (
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <InfoTable
              title="Datos de desarrollo"
              titleVariant="h5"
              rows={[
                {
                  title: "Área principal",
                  content: opportunity.developmentInfo.principalArea,
                },
                {
                  title: "Notas",
                  content: opportunity.developmentInfo.notes,
                },
              ]}
              onEdit={opportunity.step !== 'Canceled' && handleEdit}
            />
          </Grid>
          <Grid item>
            <LicenseTable
              title="Licencias"
              rows={opportunity.developmentInfo.packs.map((r) => ({
                id: nanoid(),
                totalPrice: r.pricePerUnit * r.amount,
                ...r,
              }))}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          {opportunity.step !== "Canceled" && (<Grid
          container
          direction="column"
          rowSpacing={2}
          justifyContent="center"
          sx={{ height: "inherit" }}
        >
          <Grid item>
            <FormikLicenseBuilder
              name="packs"
              label="Licencias"
              formik={formik}
            />
          </Grid>
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <FormikTextField
                    name="principalArea"
                    label="Área principal"
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
      )}
    </>
  );
}
