function formikProps<T>(
  name: T,
  label: string,
  formik: any,
) {
  return {
    id: name,
    name: name,
    label: label,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  }
};

export default formikProps;
