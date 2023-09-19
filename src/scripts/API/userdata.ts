import { readCookie } from "../cookie";
import { fetchMisskeyAPI } from "./fetchAPI";

export const getUserData = async (
  host: string,
  token?: string
): Promise<string> => {
  if (!localStorage.getItem(`${host}_userData`)) {
    const res = await fetchMisskeyAPI("i", {
      i: token ?? readCookie(`${host}_token`).unwrap(),
    });
    localStorage.setItem(`${host}_userData`, JSON.stringify(res));
  }
  return localStorage.getItem(`${host}_userData`) ?? "error!";
};
