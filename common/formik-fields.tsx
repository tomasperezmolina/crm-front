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
import { formikTextFieldProps, formikSelectProps } from "./formik-props";

interface FormikTextFieldProps {
  name: string;
  label: string;
  formik: any;
  validationSchema: any;
}

interface WithChildrenProps {
  children: React.ReactNode;
}

export function FormikSelectField({
  name,
  label,
  formik,
  validationSchema,
  children,
}: FormikTextFieldProps & WithChildrenProps) {
  const [minHeight, setMinHeight] = useState(undefined);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!minHeight) {
      setMinHeight(ref.current.clientHeight + 25);
    }
  }, [minHeight]);

  const fieldProps = formikSelectProps(name, label, formik, validationSchema);

  return (
    <Box ref={ref} style={{ minHeight }}>
      <FormControl fullWidth {...fieldProps.formControl}>
        <InputLabel {...fieldProps.inputLabel}>{label}</InputLabel>
        <Select {...fieldProps.select}>{children}</Select>
        {fieldProps.helperText && (
          <FormHelperText>{fieldProps.helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

export function FormikTextField({
  name,
  label,
  formik,
  validationSchema,
  ...rest
}: FormikTextFieldProps & TextFieldProps) {
  const [minHeight, setMinHeight] = useState(undefined);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!minHeight) {
      setMinHeight(ref.current.clientHeight + 25);
    }
  }, [minHeight]);

  return (
    <Box ref={ref} style={{ minHeight }}>
      <TextField
        fullWidth
        {...formikTextFieldProps(name, label, formik, validationSchema)}
        {...rest}
      />
    </Box>
  );
}
