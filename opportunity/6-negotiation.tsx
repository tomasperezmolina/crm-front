import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  FormikFileInput,
  FormikLicenseBuilder,
  FormikTextField,
} from "../common/formik-fields";
import { formikInitialValues } from "../common/formik-props";
import {
  NegotiationInfo,
  OpportunityInNegotiation,
} from "../model/opportunity";
import { openSnackbar } from "../state/snackbar";
import { saveOpportunityNegotiationInfo } from "../state/opportunities";
import { useAppDispatch } from "../state/dispatch";
import { Identifiable } from "../model/base";
import { InfoTable } from "../common/info-table";
import { LicenseTable } from "../common/license-builder";
import { nanoid } from "nanoid";

const validationSchema = yup.object({
  address: yup.string().required("Se requiere una dirección"),
  cuit: yup
    .string()
    .matches(/\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/, "CUIT inválido")
    .required("Se require un CUIT"),
  socialReason: yup.string().required("Se require una razón social"),
  packs: yup
    .array()
    .min(1, "Se requiere por lo menos una licencia")
    .required("Se requiere una lista de licencias a probar"),
  paymentMethod: yup.string().required("Se require un método de pago"),
  paymentTerms: yup.string().required("Se require términos de pago"),
  contractFilename: yup.string().required("Se require un contrato"),
});

interface OpportunityNegotiationProps {
  opportunity: OpportunityInNegotiation & Identifiable;
}

export default function OpportunityNegotiation({
  opportunity,
}: OpportunityNegotiationProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: async (values: NegotiationInfo) => {
      try {
        await dispatch(
          saveOpportunityNegotiationInfo({
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
    formik.setValues(opportunity.negotiationInfo!);
    setEditing(true);
  };

  return (
    <>
      {opportunity.negotiationInfo && !editing ? (
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <InfoTable
              title="Datos de negociación"
              titleVariant="h5"
              rows={[
                {
                  title: "Dirección",
                  content: opportunity.negotiationInfo.address,
                },
                {
                  title: "CUIT",
                  content: opportunity.negotiationInfo.cuit,
                },
                {
                  title: "Razón social",
                  content: opportunity.negotiationInfo.socialReason,
                },
                {
                  title: "Medio de pago",
                  content: opportunity.negotiationInfo.paymentMethod,
                },
                {
                  title: "Términos de pago",
                  content: opportunity.negotiationInfo.paymentTerms,
                },
                {
                  title: "Contrato",
                  content: opportunity.negotiationInfo.contractFilename,
                },
              ]}
              onEdit={handleEdit}
            />
          </Grid>
          <Grid item>
            <LicenseTable
              title="Licencias"
              rows={opportunity.negotiationInfo.packs.map((r) => ({
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
              label="Licencias"
              formik={formik}
            />
          </Grid>
          <Grid item>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction="column" rowSpacing={2}>
                <Grid item>
                  <FormikTextField
                    name="address"
                    label="Dirección"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="cuit"
                    label="CUIT"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="socialReason"
                    label="Razón Social"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="paymentMethod"
                    label="Medio de pago"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="paymentTerms"
                    label="Términos de pago"
                    formik={formik}
                    validationSchema={validationSchema}
                  />
                </Grid>
                <Grid item>
                  <FormikFileInput
                    name="contractFilename"
                    label="Contrato"
                    formik={formik}
                    validationSchema={validationSchema}
                    onUpload={() =>
                      new Promise<void>((resolve) => {
                        setTimeout(() => resolve(), 1000);
                      })
                    }
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
