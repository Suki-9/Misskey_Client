import "./api.d";

export const fetchAPI = async <E extends keyof Endpoints>(
  host: string,
  endpoint: keyof Endpoints,
  body: Endpoints[E]["req"],
  method: keyof Endpoints[E]["method"],
): Promise<Endpoints[E]["res"] | undefined> => {
  return fetch(`https://${host}/api/${endpoint}`, {
    method: typeof method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => data);
};
