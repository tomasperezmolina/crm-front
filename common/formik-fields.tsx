import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { formikTextFieldProps, formikSelectProps } from "./formik-props";
import LicenseBuilder from "./license-builder";

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
  const {height, ref} = useResizeDetector();
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
