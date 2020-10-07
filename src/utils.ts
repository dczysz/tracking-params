// Map URLSearchParams to [ key, value ][]
export const paramsToEntries = (params: URLSearchParams) => {
  const _params: { [key: string]: string } = {};
  params.forEach((value, key) => {
    _params[key] = value;
  });
  return Object.entries<string>(_params);
};
