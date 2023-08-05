export const getCookie = (): [string[][], string[]] => {
  const cookies = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("="));
  const cookieNames = cookies.map((cookie) => cookie[0]);
  return [cookies, cookieNames];
};

export const readCookie = (key: string) => {
  const [cookie, index] = getCookie();
  const i = index.indexOf(key);
  if (i === -1) return;
  return cookie[i][1];
};
