type InitialValues<T> = {
  [index in keyof T]: string;
};

export default function formikInitialValues<T>(
  fields: T
): InitialValues<T> {
  return Object.keys(fields).reduce((curr: any, prev: string) => {
    return { ...curr, [prev]: "" };
  }, {});
}
