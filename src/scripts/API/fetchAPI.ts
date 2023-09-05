//Type
import { Endpoints } from "./api";

//TS Module
import { readCookie } from "../cookie";

export const fetchMisskeyAPI = async <E extends keyof Endpoints>(
  endpoint: keyof Endpoints,
  body: Endpoints[E]["req"],
  host: string = readCookie("loginHost").unwrap(),
  method: Endpoints[E]["method"] = "POST"
): Promise<Endpoints[E]["res"] | undefined> => {
  return fetch(`https://${host}/api/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => data);
};
