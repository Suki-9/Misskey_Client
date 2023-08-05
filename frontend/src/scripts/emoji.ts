import { readCookie } from "./Cookie";

type Emojis = {
  aliases: string[];
  name: string;
  category: string;
  url: string;
}[];

export const getEmojiIndex = async (host?: string) => {
  const hostName = host ?? readCookie("loginHost");
  const emojis: Emojis = await fetch(`https://${hostName}/api/emojis`)
    .then((response) => response.json())
    .then((data) => data.emojis);

  const index = emojis.map((emoji) => emoji.name);

  localStorage.setItem(`${hostName}_emojis_index`, JSON.stringify(index));
  localStorage.setItem(`${hostName}_emojis`, JSON.stringify(emojis));
};

export const searchEmoji = (name: string, host?: string): [string, string] => {
  const start = performance.now();
  //emojisを取得 -> Key名のみのindexを生成
  const hostName = host ?? readCookie("loginHost");

  const localEmojis = localStorage.getItem(`${hostName}_emojis`);

  if (!localEmojis) getEmojiIndex(hostName);

  const emojis: Emojis = JSON.parse(localEmojis!);
  const index: string = JSON.parse(
    localStorage.getItem(`${hostName}_emojis_index`)!,
  );

  if (index.indexOf(name) === -1) return [name, "fail"];

  const end = performance.now();
  console.log(`${(end - start) * 100}ms!`);

  return [emojis[index.indexOf(name)].url, "success"];
};

export const parseEmoji = (text: string) => {
  const regex = /:.*?:/g;
  const matches = text.match(regex);
  matches?.forEach((emoji) => {
    const url = searchEmoji(emoji.replaceAll(":", ""));
    if (url[1] === "success")
      text = text.replace(emoji, `<img class="emoji" src="${url[0]}">`);
  });
  return text;
};
