//TS Module
import { readCookie } from "./cookie";

//Type
import { Emoji } from "./types";


const fetchEmojiIndex = async (
  host: string,
): Promise<string> => {
  return await fetch(`https://${host}/api/emojis`)
    .then(response => response.json())
    .then(data => data.emojis);
};

const createEmojiIndex = async (
  type: string[],
  host: string,
) => {
  let emojis = await fetchEmojiIndex(host);
  localStorage.setItem(`${host}_emojis`, JSON.stringify(emojis));


  //TODO ここ全て毎回評価が発生するので賢く死体
  if (type.indexOf("key") !== -1) {
    localStorage.setItem(`${host}_emojis_key`, JSON.stringify(emojis.map(emoji => emoji.name)));
  }

  if (type.indexOf("category") !== -1) {
    let categorys: Record<string, string[]> = {}
    emojis.forEach(emoji => {
      if (!categorys.hasOwnProperty(emoji.category)) categorys[emoji.category] = []
      categorys[emoji.category].push(emoji.name)
    })
    localStorage.setItem(`${host}_emojis_category`, JSON.stringify(categorys));
  }
};

export const searchEmoji = (
  name: string,
  host = readCookie("loginHost").unwrap()
): Result<string, Error> => {

<<<<<<< HEAD
  const index = readEmojiIndex("key", host);
  const emojis: Emoji[] = readEmojiIndex(undefined, host);
=======
  const emojis: Emoji[] = JSON.parse(localStorage.getItem(`${host}_emojis`)!);
  const index: string = JSON.parse(localStorage.getItem(`${host}_emojis_key`)!);

  if (!emojis || !index) createEmojiIndex(["Key"], host);

>>>>>>> 8214e70383381e97ec256e1c2bcf3545abc8407f
  if (index.indexOf(name) === -1) return new Err(new Error(name));
  
  return new Ok(emojis[index.indexOf(name)].url);
};

export const parseEmoji = (text: string) => {
  const regex = /:.*?:/g;
  const matches = text.match(regex);
  matches?.forEach(emoji => {
    const url = searchEmoji(emoji.replaceAll(":", ""));
    if (url.isOk())
      text = text.replace(emoji, `<img class="emoji" src="${url.value}">`);
  });
  return text;
};

export const readEmojiIndex = (
  type?: string,
  host = readCookie("loginHost").unwrap()
) => {
<<<<<<< HEAD
  let localEmojis = localStorage.getItem(`${host}_emojis${type ? `_${type}` : ""}`);

  if (!localEmojis) {
    createEmojiIndex([type ?? ""], host);
    localEmojis = localStorage.getItem(`${host}_emojis${type ? `_${type}` : ""}`);
  }
  return JSON.parse(localEmojis ?? "{}");
=======
  const localEmojis = localStorage.getItem(`${host}_emojis${type ? `_${type}` : ""}`);
  if (!localEmojis) createEmojiIndex([type], host);
  return JSON.parse(localEmojis ?? "");
>>>>>>> 8214e70383381e97ec256e1c2bcf3545abc8407f
}