import { readCookie } from "../Cookie";
import { noteGen } from "../note";
import { Note, NoteData } from "../types";

export const getNote = async (
  host: string,
  channel?: string,
  token?: string,
  maxIndexSize?: number,
): Promise<Note[]> => {
  const res: NoteData[] = await fetch(
    `https://${host}/api/notes/${channel ?? "home"}-timeline`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token ?? readCookie(`${host}_token`),
        limit: maxIndexSize ?? 10,
      }),
    },
  )
    .then((response) => response.json())
    .then((data) => data);

  return res.map((note) => noteGen(note));
};
