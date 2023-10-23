export const fetchMisskeyAPI = async <E extends keyof Mi_Endpoints>(
  endpoint: keyof Mi_Endpoints,
  body: Mi_Endpoints[E]["req"],
  host: string,
  method: "POST" | "GET" = "POST"
): Promise<Mi_Endpoints[E]["res"] | undefined> => {
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
