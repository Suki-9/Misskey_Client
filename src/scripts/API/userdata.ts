import { fetchMisskeyAPI } from "./fetchAPI";

export const getUserData = async (host: string, token?: string, userName?: string): Promise<UserData | undefined> => {
  if (host && token) {
    const fetchUserData = await fetchMisskeyAPI<"i">(
      "i",
      {
        i: token,
      },
      host
    );
    if (fetchUserData) {
      localStorage.setItem(`${host}_${fetchUserData.id}_UserData`, JSON.stringify(fetchUserData));
      return fetchUserData;
    }
  }
  let UserData = localStorage.getItem(`${host}_${userName}_userName`);
  return UserData ? JSON.parse(UserData) : undefined;
};

export const addUsersData = async (host: string, token: string): Promise<string | undefined> => {
  const fetchUserdata = await getUserData(host, token);
  if (fetchUserdata) {
    const usersData = localStorage.getItem("usersData"),
      parsedUsersData = usersData ? JSON.parse(usersData) : new Object();

    parsedUsersData[`${host}_${fetchUserdata.id}`] = {
      userName: fetchUserdata.username,
      avatarURL: fetchUserdata.avatarUrl,
      host: host,
      token: token,
    };
    localStorage.setItem("usersData", JSON.stringify(parsedUsersData));
    return `${host}_${fetchUserdata.id}`;
  }
};
