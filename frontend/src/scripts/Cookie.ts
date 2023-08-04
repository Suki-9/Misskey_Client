export const getCookie = (): [string[][], string[]] => {
  const cookies = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("="));
  const cookieNames = cookies.map((cookie) => cookie[0]);
  return [cookies, cookieNames];
};

export const readCookie = (key: string) => {
  const index = getCookie()[1];
  const Cookie = getCookie()[0];
  const i = index.indexOf(key);
  if (i === -1) return;
  return Cookie[i][1];
};
