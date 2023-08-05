import { readCookie } from "../Cookie";
import { noteGen } from "../note";
import { ModifiedNote, Note } from "../types";

export const getNote = async (
  host: string,
  channel: string = "home",
  maxIndexSize: number = 10,
  token?: string
): Promise<ModifiedNote[]> => {
  const res: Note[] = await fetch(
    `https://${host}/api/notes/${channel}-timeline`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token ?? readCookie(`${host}_token`),
        limit: maxIndexSize,
      }),
    }
  )
    .then(response => response.json())
    .then(data => data);

  return res.map(note => noteGen(note));
};
