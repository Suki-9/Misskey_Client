export const cookieIndex: { [key: string]: string } = document.cookie.split("; ").reduce((accumulator, value) => {
  const kv = value.split("=");
  return { ...accumulator, [kv[0]]: kv[1] };
}, {});

export const readCookie = (key: string): Result<string | undefined> => {
  return cookieIndex[key] ? { value: cookieIndex[key], isOk: true } : { value: undefined, isOk: false };
};
