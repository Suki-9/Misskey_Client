import { UserData } from "../Types/types";
import { fetchMisskeyAPI } from "./fetchAPI";


export const getUserData = async (host: string, token?: string, userName?: string): Promise<UserData | undefined> => {
  if (token) {
    const fetchUserData = await fetchMisskeyAPI<"i">("i", {
      i: token,
    }, host);
    if (fetchUserData) {
      localStorage.setItem(`${host}_${fetchUserData.username}_UserData`, JSON.stringify(fetchUserData))
      return fetchUserData
    }
  }
  let UserData = localStorage.getItem(`${host}_${userName}_userName`)
  return UserData ? JSON.parse(UserData) : undefined
}

export const addUsersData = async (host: string, token: string): Promise<string | undefined> => {
  const fetchUserdata = await getUserData(host, token)
  if (fetchUserdata) {
    let usersData = localStorage.getItem("usersData")
    if (!usersData) {
      usersData = "{}"
    }
    localStorage.setItem("usersData", JSON.stringify(JSON.parse(usersData)[`${host}_${fetchUserdata.id}`] = {
      userName: fetchUserdata.username,
      avaterURL: fetchUserdata.avatarUrl,
      host: host,
      token: token,
    }))
    return `${host}_${fetchUserdata.id}`
  }
}