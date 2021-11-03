import React from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, FormikRating, FormikTextField } from "../common/formik-fields";
import {
  OpportunityInPOCImplementation,
  POCImplementationInfo,
} from "../model/opportunity";
import { openSnackbar } from "../state/snackbar";
import { saveOpportunityPOCImplementationInfo } from "../state/opportunities";
import { useAppDispatch } from "../state/dispatch";
import { Identifiable } from "../model/base";
import { InfoTable } from "../common/info-table";

const maxNotesLenght = 1000;

const validationSchema = yup.object({
  notes: yup
    .string()
    .optional()
    .max(
      maxNotesLenght,
      `Se permite un máximo de ${maxNotesLenght} caracteres`
    ),
  uxRating: yup
    .number()
    .min(1, "Se requiere un rating de UX")
    .required("Se requiere un rating de UX")
    .max(5),
  processRating: yup
    .number()
    .min(1, "Se requiere un rating de procesos")
    .required("Se requiere un rating de procesos")
    .max(5),
});

function formToInfo(form: Form<POCImplementationInfo>): POCImplementationInfo {
  return {
    notes: form.notes,
    uxRating: parseInt(form.uxRating),
    processRating: parseInt(form.processRating),
  };
}

interface OpportunityPOCImplementationProps {
  opportunity: OpportunityInPOCImplementation & Identifiable;
}

export default function OpportunityPOCImplementation({
  opportunity,
}: OpportunityPOCImplementationProps) {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      notes: "",
      uxRating: "",
      processRating: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: Form<POCImplementationInfo>) => {
      try {
        await dispatch(
          saveOpportunityPOCImplementationInfo({
            id: opportunity.id,
            info: formToInfo(values),
          })
        );
      } catch (e: any) {
        dispatch(openSnackbar({ msg: e.message, type: "error" }));
      }
    },
  });

  return (
    <>
      {opportunity.pocImplementationInfo ? (
        <InfoTable
          title="Datos de implementación de POC"
          titleVariant="h5"
          rows={[
            {
              title: "Rating de UX",
              content: `${opportunity.pocImplementationInfo.uxRating}/5`,
            },
            {
              title: "Rating de Proceso",
              content: `${opportunity.pocImplementationInfo.processRating}/5`,
            },
            {
              title: "Notas",
              content: opportunity.pocDevelopmentInfo.notes,
            },
          ]}
        />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ height: "inherit" }}
        >
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" rowSpacing={2}>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  columnSpacing={2}
                  columns={2}
                >
                  <Grid xs={1} item>
                    <FormikRating
                      name="uxRating"
                      label="Rating de UX"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
                  <Grid xs={1} item>
                    <FormikRating
                      name="processRating"
                      label="Rating de Proceso"
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </Grid>
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
