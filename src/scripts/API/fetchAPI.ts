import "./api.d";

const fetchMethod = ["POST", "GET"] as const;

export const fetchAPI = async <E extends keyof Endpoints>(
  host: string,
  endpoint: keyof Endpoints,
  body: Endpoints[E]["req"],
  method: ElementOf<typeof fetchMethod>,
): Promise<Endpoints[E]["res"] | undefined> => {
  return fetch(`https://${host}/api/${endpoint}`, {
    method: fetchMethod[0],
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => data);
};
