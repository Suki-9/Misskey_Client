import { readCookie } from "./Cookie";

export const getEmojiIndex = async (host?: string) => {
  const hostName: string = host ?? readCookie("loginHost")!;
  const emojis: { name: string }[] = await fetch(
    `https://${hostName}/api/emojis`,
  )
    .then((response) => response.json())
    .then((data) => data.emojis);

  const index: string[] = [];

  emojis.forEach((emoji) => {
    index.push(emoji.name);
  });

  localStorage.setItem(`${hostName}_emojis_index`, JSON.stringify(index));
  localStorage.setItem(`${hostName}_emojis`, JSON.stringify(emojis));
};

export const searchEmoji = (name: string, host?: string): [string, string] => {
  //emojisを取得 -> Key名のみのindexを生成
  const hostName = host ?? readCookie("loginHost");
  const emojis: { url: string }[] = JSON.parse(
    localStorage.getItem(`${hostName}_emojis`)!,
  );
  const index: string = JSON.parse(
    localStorage.getItem(`${hostName}_emojis_index`)!,
  );
  if (index.indexOf(name) !== -1)
    return [emojis[index.indexOf(name)].url, "success"];
  return [name, "fail"];
};

export const parseEmoji = (text: string) => {
  const regex = /:.*?:/g;
  const matches = text.match(regex);
  matches?.forEach((emoji) => {
    const url = searchEmoji(emoji.replaceAll(":", ""));
    if (url[1] === "success")
      text = text!.replace(emoji, `<img class="emoji" src="${url[0]}">`);
  });
  return text;
};
