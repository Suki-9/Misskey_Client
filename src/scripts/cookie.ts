export const cookieIndex: { [key: string]: string } = document.cookie.split("; ").reduce((accumulator, value) => {
  const kv = value.split("=");
  return { ...accumulator, [kv[0]]: kv[1] };
}, {});

export const readCookie = (key: string): Result<string | undefined> => {
  return cookieIndex[key] ? { value: cookieIndex[key], isOk: true } : { value: undefined, isOk: false };
};

// TODO 何かしら返したほうがいいかも
export const writeCookie = (key: string, value?: string): void => {
  document.cookie = `${key}=${value}; expires=0; path=/`;
}

export const deleteCookie = (key: string): void => {
  document.cookie = `${key}=; expires=0; path=/`;
}
