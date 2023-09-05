import "./api.d";

export const fetchAPI = async <E extends keyof Endpoints>(
  host: string,
  endpoint: keyof Endpoints,
  method: "POST" | "GET",
  body: Endpoints[E]["req"]
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
