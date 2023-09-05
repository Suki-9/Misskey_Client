import { readCookie } from "../cookie";

export const getUserData = async (
  host: string,
  token?: string
): Promise<string> => {
  if (!localStorage.getItem(`${host}_userData`)) {
    const res = await fetch(`https://${host}/api/i`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token ?? readCookie(`${host}_token`).unwrap(),
      }),
    })
      .then(response => response.json())
      .then(data => data);
    localStorage.setItem(`${host}_userData`, JSON.stringify(res));
  }
  return localStorage.getItem(`${host}_userData`) ?? "error!";
};
