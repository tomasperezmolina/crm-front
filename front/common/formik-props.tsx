import { getIn } from "formik";

const isRequiredField = (validationSchema: any, name: string) => {
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

export default function formikProps(
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
