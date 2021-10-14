import { Box, TextField, TextFieldProps } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import formikProps from "./formik-props";

interface FormikTextFieldProps {
  name: string;
  label: string;
  formik: any;
  validationSchema: any;
}

export default function FormikTextField({
  name,
  label,
  formik,
  validationSchema,
  ...rest
}: FormikTextFieldProps & TextFieldProps) {
  const [minHeight, setMinHeight] = useState(undefined)
  const ref = useRef<any>(null)

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
