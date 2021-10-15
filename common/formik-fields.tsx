import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import formikProps from "./formik-props";

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

  const fieldProps = formikProps(name, label, formik, validationSchema);

  return (
    <Box ref={ref} style={{ minHeight }}>
      <FormControl fullWidth required={fieldProps.required} error={fieldProps.error}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          {...formikProps(name, label, formik, validationSchema)}
        >
          {children}
        </Select>
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
        {...formikProps(name, label, formik, validationSchema)}
        {...rest}
      />
    </Box>
  );
}
