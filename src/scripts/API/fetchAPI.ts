// Type ------------------------------------------------///
import { Endpoints } from "./api";

//TS Module --------------------------------------------///
import { readCookie } from "../cookie";

export const fetchMisskeyAPI = async <E extends keyof Endpoints>(
  endpoint: keyof Endpoints,
  body: Endpoints[E]["req"],
  host: string = readCookie("loginHost").value!,
  method: "POST" | "GET" = "POST"
): Promise<Endpoints[E]["res"] | undefined> => {
  //TODO https でない場合 どうするか。
  return fetch(`${host}/api/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => (response.ok ? response.json() : undefined))
    .then(data => data)
    .catch(() => {
      return undefined;
    });
};
