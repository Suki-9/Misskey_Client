//TS Module
import { readCookie } from "./cookie";

//Type
import { Emoji } from "./types";

type Emojis = {
  aliases: string[];
  name: string;
  category: string;
  url: string;
}[];

export const fetchEmojiIndex = async (
  host = readCookie("loginHost").unwrap()
): Promise<Emoji[]> => {
  return await fetch(`https://${host}/api/emojis`)
    .then(response => response.json())
    .then(data => data.emojis);
};

export const createEmojiIndex = async (
  type: string[],
  host = readCookie("loginHost").unwrap(),
) => {
  const emojis = await fetchEmojiIndex(host);

  localStorage.setItem(`${host}_emojis`, JSON.stringify(emojis));

  //TODO ここ全て毎回評価が発生するので賢く死体

  //Key名のみのindexを生成
  if (type.indexOf("Key") !== -1)
    localStorage.setItem(
      `${host}_emojis_key`,
      JSON.stringify(emojis.map(emoji => emoji.name))
    );

  if (type.indexOf("category") !== -1) {
    const categorys: Record<string, string[]> = {}
  
    emojis.forEach(emoji => {
      if (!categorys.hasOwnProperty(emoji.category)) categorys[emoji.category].push(emoji.name)
    })
    localStorage.setItem(`${host}_emojis_category`,JSON.stringify(categorys));
  }
};

export const searchEmoji = (
  name: string,
  host = readCookie("loginHost").unwrap()
): Result<string, Error> => {

  const localEmojis = localStorage.getItem(`${host}_emojis`);

  if (!localEmojis) createEmojiIndex(["Key"], host);

  const emojis: Emojis = JSON.parse(localEmojis!);
  const index: string = JSON.parse(localStorage.getItem(`${host}_emojis_key`)!);

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