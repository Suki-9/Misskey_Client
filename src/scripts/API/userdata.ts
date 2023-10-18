import { fetchMisskeyAPI } from "./fetchAPI";

export const getUserData = async (
  host: string,
  token?: string
): Promise<Result<string | undefined>> => {
  if (!localStorage.getItem(`${host}_userData`) && token) {
    const res = await fetchMisskeyAPI<"i">("i", {
      i: token,
    });
    localStorage.setItem(`${host}_userData`, JSON.stringify(res));
  }
  const userdata = localStorage.getItem(`${host}_userData`)
  return userdata ? { value: userdata, isOk: true } : { value: undefined, isOk: false };
};
