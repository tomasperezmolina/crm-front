import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Rating,
  Select,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import {
  formikTextFieldProps,
  formikSelectProps,
  isRequiredField,
} from "./formik-props";
import LicenseBuilder from "./license-builder";
import DeleteIcon from "@mui/icons-material/Delete";

interface FormikFieldProps {
  name: string;
  label: string;
  formik: any;
  validationSchema: any;
}

interface WithChildrenProps {
  children: React.ReactNode;
}

function ErrorBox({ children }: WithChildrenProps) {
  const { height, ref } = useResizeDetector();
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (height && height !== minHeight) {
      setMinHeight(height + 25);
    }
  }, [minHeight, height]);
  return (
    <Box ref={ref} style={{ minHeight }}>
      {children}
    </Box>
  );
}

type FormikSelectFieldProps = FormikFieldProps & WithChildrenProps;

export function FormikSelectField({
  name,
  label,
  formik,
  validationSchema,
  children,
}: FormikSelectFieldProps) {
  const fieldProps = formikSelectProps(name, label, formik, validationSchema);

  return (
    <ErrorBox>
      <FormControl fullWidth {...fieldProps.formControl}>
        <InputLabel {...fieldProps.inputLabel}>{label}</InputLabel>
        <Select {...fieldProps.select}>{children}</Select>
        {fieldProps.helperText && (
          <FormHelperText>{fieldProps.helperText}</FormHelperText>
        )}
      </FormControl>
    </ErrorBox>
  );
}

type FormikTextFieldProps = FormikFieldProps & TextFieldProps;

export function FormikTextField({
  name,
  label,
  formik,
  validationSchema,
  ...rest
}: FormikTextFieldProps) {
  return (
    <ErrorBox>
      <TextField
        fullWidth
        {...formikTextFieldProps(name, label, formik, validationSchema)}
        {...rest}
      />
    </ErrorBox>
  );
}

type FormikLicenseBuilderProps = Omit<FormikFieldProps, "validationSchema">;

export function FormikLicenseBuilder({
  name,
  label,
  formik,
}: FormikLicenseBuilderProps) {
  const error = formik.touched[name] && Boolean(formik.errors[name]);
  const helperText = formik.touched[name] && formik.errors[name];
  return (
    <ErrorBox>
      <LicenseBuilder
        title={label}
        value={formik.values[name]}
        onChange={(rows) => formik.setFieldValue(name, rows, true)}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </ErrorBox>
  );
}

export function FormikRating({
  name,
  label,
  formik,
  validationSchema,
}: FormikFieldProps) {
  const error = formik.touched[name] && Boolean(formik.errors[name]);
  const helperText = formik.touched[name] && formik.errors[name];
  const labelId = `${name}-label`;
  const required = isRequiredField(validationSchema, name);
  return (
    <ErrorBox>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <InputLabel id={labelId}>{label}{required && " *"}</InputLabel>
        </Grid>
        <Grid item>
          <Rating
            id={name}
            name={name}
            value={parseInt(formik.values[name])}
            onChange={(event, newValue) => {
              if (!newValue) {
                formik.setFieldValue(name, 0, true);
              } else {
                formik.handleChange(event, newValue);
              }
            }}
          />
        </Grid>
        <Grid item>
          <FormHelperText error={error}>{helperText}</FormHelperText>
        </Grid>
      </Grid>
    </ErrorBox>
  );
}

export function FormikFileInput({
  name,
  label,
  formik,
  validationSchema,
}: FormikFieldProps) {
  const error = formik.touched[name] && Boolean(formik.errors[name]);
  const helperText = formik.touched[name] && formik.errors[name];
  const labelId = `${name}-label`;
  const handleDelete = () => {
    formik.setFieldValue(name, "", true);
  };
  const required = isRequiredField(validationSchema, name);
  return (
    <ErrorBox>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <InputLabel id={labelId}>
            {label}
            {required && " *"}
          </InputLabel>
        </Grid>
        <Grid item container direction="row" columnSpacing={2}>
          <Grid item>
            <input
              style={{ display: "none" }}
              id={name}
              type="file"
              onChange={(event) => {
                const fileList = event.target.files;
                if (fileList) {
                  formik.setFieldValue(
                    name,
                    { filename: fileList[0].name, file: fileList[0] },
                    true
                  );
                }
              }}
            />
            <label htmlFor={name}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ width: "170px" }}
              >
                Subir
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Typography>{formik.values[name].filename}</Typography>
          </Grid>
          {formik.values[name] && (
            <Grid item>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
        {helperText && (
          <Grid item>
            <FormHelperText error={error}>{helperText}</FormHelperText>
          </Grid>
        )}
      </Grid>
    </ErrorBox>
  );
}

export type Form<T> = {
  [Field in keyof T]: string;
}
