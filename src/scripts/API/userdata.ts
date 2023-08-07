import { readCookie } from "../cookie";


export const getUserData = async (
	host: string,
	token?: string
) => {
  const res = await fetch(
    `https://${host}/api/i`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token ?? readCookie(`${host}_token`).unwrap(),
      }),
    }
  )
    .then(response => response.json())
		.then(data => data);

    document.cookie = `userData_${host}=${JSON.stringify(res)}; path=/`
};