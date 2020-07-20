// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParamVal = (data: any, paramKey: string) => {
  if (!data || !('parameters' in data)) {
    return;
  }

  const { parameters } = data;

  return parameters[paramKey];
};
