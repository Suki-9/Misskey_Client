export const getCookie = (): [string[][], string[]] => {
  const cookies = document.cookie.split("; ").map(cookie => cookie.split("="));
  const cookieNames = cookies.map(cookie => cookie[0]);
  return [cookies, cookieNames];
};

export const readCookie = (key: string): Result<string, Error> => {
  const [cookies, cookieNames] = getCookie();
  const i = cookieNames.indexOf(key);
  if (i === -1) return new Err(new Error(`failed to read cookie "${key}".`));
  return new Ok(cookies[i][1]);
};
