export default {
    async search(query,host) {
        const res = await fetch("http://192.168.23.88:3000/req/emojis/search",{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                host: host,
            }),
        }).then((response) => response.json()).then((data) => {return data});

        if (res.msg !== "success!") {
            await this.get(host);
            await this.search(query,host);
        }
        return res
    },
    async get(host) {
        const server = "192.168.23.88:3000"
        await fetch(`http://${server}/req/emojis/get`,{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                host: host,
            })
        })
    },
    async parse(user_name,mainhost,attr) {
        const emoji = user_name.match(/:.*?:/g)
        if (emoji !== null) {
            const emoji_url = await this.search(emoji.join(''),mainhost)
            for (let i = 0;i < emoji.length;i++)
                user_name = user_name.replace(emoji[i],`<img class='${attr}_emoji' src='${emoji_url[emoji[i]]}'>`)
        }
        return user_name
    },
}