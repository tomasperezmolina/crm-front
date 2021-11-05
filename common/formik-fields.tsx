import {
  Box,
  Button,
  CircularProgress,
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
import { nanoid } from "nanoid";

interface FormikFieldProps {
  name: string;
  label: string;
  formik: any;
  validationSchema: any;
}

interface WithChildrenProps {
  children: React.ReactNode;
}

interface ErrorBoxProps extends WithChildrenProps {
  extraHeight?: number;
}

function ErrorBox({ children, extraHeight }: ErrorBoxProps) {
  const { height, ref } = useResizeDetector();
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (height && height !== minHeight) {
      setMinHeight(height + (extraHeight ?? 25));
    }
  }, [minHeight, height, extraHeight]);
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
        value={formik.values[name].map((r: any) => ({
          id: nanoid(),
          totalPrice: r.pricePerUnit * r.amount,
          ...r,
        }))}
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
          <InputLabel id={labelId}>
            {label}
            {required && " *"}
          </InputLabel>
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

type FormikFileInputProps = FormikFieldProps & {
  onUpload: (file: { filename: string; file: File }) => Promise<void>;
};

export function FormikFileInput({
  name,
  label,
  formik,
  validationSchema,
  onUpload,
}: FormikFileInputProps) {
  const error = formik.touched[name] && Boolean(formik.errors[name]);
  const helperText = formik.touched[name] && formik.errors[name];
  const labelId = `${name}-label`;
  const handleDelete = () => {
    formik.setFieldValue(name, "", true);
  };
  const [uploading, setUploading] = useState(false);
  const required = isRequiredField(validationSchema, name);
  return (
    <ErrorBox extraHeight={50}>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <InputLabel id={labelId}>
            {label}
            {required && " *"}
          </InputLabel>
        </Grid>
        <Grid
          item
          container
          direction="row"
          columnSpacing={2}
          alignItems="center"
          sx={{minHeight: 50}}
        >
          <Grid item>
            <input
              style={{ display: "none" }}
              id={name}
              type="file"
              onChange={async (event) => {
                setUploading(true);
                try {
                  const fileList = event.target.files;
                  if (fileList) {
                    const file = {
                      filename: fileList[0].name,
                      file: fileList[0],
                    };
                    await onUpload(file);
                    formik.setFieldValue(name, file.filename, true);
                  }
                } catch (e) {
                  console.error(e);
                }
                setUploading(false);
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
          {!uploading && formik.values[name] && (
            <>
              <Grid item>
                <Typography>{formik.values[name]}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </>
          )}
          {uploading && (
            <Grid item>
              <CircularProgress size={25} />
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
};
