import { getIn } from "formik";

export const isRequiredField = (validationSchema: any, name: string) => {
  return !!getIn(validationSchema.describe().fields, name).tests.find(
    ({ name }: { name: string }) => name === "required"
  );
};

const getInputType = (validationSchema: any, name: string) => {
  const validationType = getIn(validationSchema.describe().fields, name).type;
  if (validationType === "string") return "text";
  return validationType;
};

const getInputLabelProps = (inputType: string) => {
  if (inputType === "date") return { shrink: true };
  else return undefined;
};

type InitialValues<T> = {
  [index in keyof T]: any;
};

export function formikInitialValues<T>(
  fields: T,
  validationSchema: any
): InitialValues<T> {
  return Object.keys(fields).reduce((prev: any, curr: string) => {
    return {
      ...prev,
      [curr]: validationSchema.fields[curr].type === "array" ? [] : "",
    };
  }, {});
}

export function formikTextFieldProps(
  name: string,
  label: string,
  formik: any,
  validationSchema: any
) {
  const inputType = getInputType(validationSchema, name);
  return {
    id: name,
    name: name,
    label: label,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
    required: isRequiredField(validationSchema, name),
    type: inputType,
    InputLabelProps: getInputLabelProps(inputType),
  };
}

export function formikSelectProps(
  name: string,
  label: string,
  formik: any,
  validationSchema: any
) {
  const labelId = `${name}-label`;
  const required = isRequiredField(validationSchema, name);

  return {
    formControl: {
      required,
      error: formik.touched[name] && Boolean(formik.errors[name]),
    },
    inputLabel: {
      id: labelId,
    },
    select: {
      id: name,
      name: name,
      labelId,
      label: `${label}${required && " *"}`,
      value: formik.values[name],
      onChange: formik.handleChange,
    },
    helperText: formik.touched[name] && formik.errors[name],
  };
}


export function formikRatingProps(
  name: string,
  label: string,
  formik: any,
  validationSchema: any
) {
  return {
    id: name,
    name: name,
    label: label,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
    required: isRequiredField(validationSchema, name),
  };
}