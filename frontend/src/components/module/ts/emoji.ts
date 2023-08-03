import { read } from "./Cookie"

export const getEmojiIndex = async (host?: string) => {
    //emojisを取得 -> Key名のみのindexを生成
    const hostName: string = (host == undefined) ? read('loginHost') as string : host;
    const emojis: any[] = await fetch(`https://${hostName}/api/emojis`)
		.then((response) => response.json())
        .then((data) => data.emojis)
    
    const index: string[] = []
    emojis.forEach(emoji => {
        index.push(emoji.name)
    });
    
    localStorage.setItem(`${hostName}_emojis_index`, JSON.stringify(index))
    localStorage.setItem(`${hostName}_emojis`, JSON.stringify(emojis))
}

export const emojiSearch = (name: string, host?: string) => {
    //
    const hostName = (host == undefined) ? read('loginHost') : host;
    const emojis = JSON.parse(localStorage.getItem(`${hostName}_emojis`) as string)
    const index = JSON.parse(localStorage.getItem(`${hostName}_emojis_index`) as string)

    if (index.indexOf(name) !== -1)
        return [emojis[index.indexOf(name)].url,'success']
    else
        return [name,'fail']
}

export const emojiPerth = (text: string) => {
    const regex = /:.*?:/g;
    let result = text
    if (text !== null) {
        const matches = text.match(regex)
        matches?.forEach(emoji => {
            const url = emojiSearch(emoji.replaceAll(':', ''))
            if (url[1] == 'success')
                result = result.replace(emoji, `<img class="emoji" src="${url[0]}">`)
            else
                result = result.replace(emoji, emoji)
        })
    }
    return result
}
