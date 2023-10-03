export const cookieIndex: {[key: string]: string} = document.cookie.split("; ").reduce((accumulator, value) => {
  const kv = value.split("=");
  return { ...accumulator, [kv[0]]: kv[1] };
}, {})

export const readCookie = (key: string): Result<string, Error> => {
  return (cookieIndex[key]) 
    ? new Ok(cookieIndex[key])
    : new Err(new Error(`failed to read cookie "${key}".`));
}